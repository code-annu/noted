import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import {
  CollaborationCreateInputDTO,
  CollaborationOutputDTO,
} from "../../dto/collaboration-dto";

export class InviteCollaboratorUsecase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly noteRepo: INoteRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(
    noteId: string,
    invitedBy: string,
    input: CollaborationCreateInputDTO
  ): Promise<CollaborationOutputDTO> {
    const inviter = await this.userRepo.getUserById(invitedBy);
    if (!inviter) throw new NotFoundError("Inviter not found!");

    const note = await this.noteRepo.getNote(noteId);
    if (!note) throw new NotFoundError("Note not found!");

    const invitee = await this.userRepo.getUserByUsername(input.username);
    if (!invitee) throw new NotFoundError("Invitee not found!");

    if (note.ownerId !== invitedBy) {
      throw new ForbiddenError(
        "You are not authorized to invite collaborators"
      );
    }

    const collaboration = await this.collaborationRepo.createCollaboration({
      notedId: noteId,
      userId: invitee.id,
      role: input.role,
      invitedBy: invitedBy,
    });

    return {
      note: note,
      invitedBy: inviter,
      user: invitee,
      collaboration: collaboration,
    } as CollaborationOutputDTO;
  }
}
