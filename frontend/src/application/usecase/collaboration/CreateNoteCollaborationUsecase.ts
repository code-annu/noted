import type {
  Collaboration,
  CollaborationCreate,
} from "../../../domain/entities/collaboration";
import type { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";

export class CreateNoteCollaborationUsecase {
  constructor(private readonly collaborationRepo: ICollaborationRepository) {}

  async execute(
    noteId: string,
    collaborationCreate: CollaborationCreate
  ): Promise<Collaboration> {
    return this.collaborationRepo.createCollaboration(
      noteId,
      collaborationCreate
    );
  }
}
