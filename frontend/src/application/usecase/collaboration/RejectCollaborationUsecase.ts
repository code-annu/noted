import type { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";

export class RejectCollaborationUsecase {
  constructor(
    private readonly noteCollaborationRepo: ICollaborationRepository
  ) {}

  async execute(collaborationId: string) {
    await this.noteCollaborationRepo.rejectCollaboration(collaborationId);
  }
}
