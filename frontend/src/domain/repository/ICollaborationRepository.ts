import type {
  Collaboration,
  CollaborationCreate,
} from "../entities/collaboration";

export interface ICollaborationRepository {
  createCollaboration(
    noteId: string,
    collaborationCreate: CollaborationCreate
  ): Promise<Collaboration>;

  getMyCollaborations(): Promise<Collaboration[]>;

  acceptCollaboration(id: string): Promise<Collaboration>;

  getNotesCollaborations(noteId: string): Promise<Collaboration[]>;

  rejectCollaboration(id: string): Promise<void>;
}
