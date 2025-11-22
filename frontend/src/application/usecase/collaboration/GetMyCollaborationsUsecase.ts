import type { Collaboration } from "../../../domain/entities/collaboration";
import type { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";

export class GetMyCollaborationsUsecase {
  constructor(private readonly collaborationRepo: ICollaborationRepository) {}

  async execute(): Promise<Collaboration[]> {
    return this.collaborationRepo.getMyCollaborations();
  }
}
