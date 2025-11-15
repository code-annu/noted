import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { CollaborationOutputDTO } from "../../dto/collaboration-dto";

export class ListNoteCollaborationsUsecase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly noteRepo: INoteRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(
    noteId: string,
    userId: string
  ): Promise<CollaborationOutputDTO[]> {
    const note = await this.noteRepo.getNote(noteId);
    if (!note) throw new NotFoundError("Note not found!");

    const collaborations =
      await this.collaborationRepo.listCollaborationsOfNote(noteId);

    const filteredCollaborations = collaborations.filter(
      (collaboration) => collaboration.userId == userId
    );

    if (note.ownerId != userId && filteredCollaborations.length < 1) {
      throw new ForbiddenError(
        "You are not authorized to visit collaborations for this note"
      );
    }

    const collaborationOutputDTOs: CollaborationOutputDTO[] = [];
    for (const collaboration of collaborations) {
      const invitedBy = await this.userRepo.getUserById(
        collaboration.invitedBy
      );
      const invitee = await this.userRepo.getUserById(collaboration.userId);

      if (invitedBy && invitee) {
        collaborationOutputDTOs.push({
          note: note,
          invitedBy: invitedBy,
          user: invitee,
          collaboration: collaboration,
        });
      }
    }

    return collaborationOutputDTOs;
  }
}
