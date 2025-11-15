import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { CollaborationOutputDTO } from "../../dto/collaboration-dto";

export class ListMyCollaborationsUsecase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly noteRepo: INoteRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(userId: string): Promise<CollaborationOutputDTO[]> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const collaborations = await this.collaborationRepo.listCollaborationsOfUser(
      userId
    );

    const collaborationOutputDTOs: CollaborationOutputDTO[] = [];

    for (const collaboration of collaborations) {
      const note = await this.noteRepo.getNote(collaboration.noteId);
      const invitedBy = await this.userRepo.getUserById(
        collaboration.invitedBy
      );
      const invitee = await this.userRepo.getUserById(collaboration.userId);

      if (note && invitedBy && invitee) {
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
