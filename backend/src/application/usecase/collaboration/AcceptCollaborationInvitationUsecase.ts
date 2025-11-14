import { ConflictError } from "../../../domain/error/ConflictError";
import { DatabaseError } from "../../../domain/error/DatabaseError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { CollaborationOutputDTO } from "../../dto/collaboration-dto";

export class AcceptCollaborationInvitationUsecase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly noteRepo: INoteRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(
    userId: string,
    collaborationId: string
  ): Promise<CollaborationOutputDTO> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const collaboration = await this.collaborationRepo.getCollaboration(
      collaborationId
    );
    if (!collaboration) throw new NotFoundError("Collaboration not found!");

    if (collaboration.userId !== userId) {
      throw new ForbiddenError(
        "You are not authorized to accept this collaboration"
      );
    }

    if (collaboration.acceptedAt !== null) {
      throw new ConflictError("Collaboration is already accepted");
    }

    const note = await this.noteRepo.getNote(collaboration.noteId);
    if (!note) throw new NotFoundError("Note not found!");

    const inviter = await this.userRepo.getUserById(collaboration.invitedBy);
    if (!inviter) throw new NotFoundError("Inviter not found!");

    const updatedCollaboration =
      await this.collaborationRepo.updateCollaboration(collaborationId, {
        acceptedAt: new Date(),
      });

    if (!updatedCollaboration) {
      throw new DatabaseError("Failed to updated collaboration");
    }

    return {
      user: user,
      invitedBy: inviter,
      note: note,
      collaboration: updatedCollaboration,
    };
  }
}
