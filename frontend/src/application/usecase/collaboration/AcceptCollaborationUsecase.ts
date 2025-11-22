import type { Collaboration } from "../../../domain/entities/collaboration";
import type { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";

export class AcceptCollaborationUsecase {
  constructor(private readonly collaborationRepo: ICollaborationRepository) {}

  async execute(collaborationId: string): Promise<Collaboration> {
    return this.collaborationRepo.acceptCollaboration(collaborationId);
  }
}
