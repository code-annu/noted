import type { Collaboration } from "../../../domain/entities/collaboration";
import type { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";

export class GetNoteCollaborationsUsecase {
  constructor(private readonly collaborationRepo: ICollaborationRepository) {}

  async execute(noteId: string):Promise<Collaboration[]> {
    return this.collaborationRepo.getNotesCollaborations(noteId)
  }
}
