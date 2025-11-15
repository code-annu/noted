import { DatabaseError } from "../../../domain/error/DatabaseError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";

export class RejectCollaborationInvitationUsecase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(collaborationId: string, userId: string) {
    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const collaboration = await this.collaborationRepo.getCollaboration(
      collaborationId
    );
    if (!collaboration) throw new NotFoundError("Collaboration not found!");

    if (collaboration.userId !== userId) {
      throw new ForbiddenError(
        "You are not authorized to reject this collaboration"
      );
    }

    const deletedCollaboration =
      await this.collaborationRepo.deleteCollaboration(collaborationId);
    if (!deletedCollaboration) {
      throw new DatabaseError("Collaboration deletion failed");
    }
  }
}
