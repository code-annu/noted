import {
  Collaboration,
  CollaborationCreate,
  CollaborationUpdate,
} from "../entities/collaboration";

export interface ICollaborationRepository {
  createCollaboration(
    collaboratorCreate: CollaborationCreate
  ): Promise<Collaboration>;

  getCollaboration(id: string): Promise<Collaboration | null>;

  updateCollaboration(
    id: string,
    updates: CollaborationUpdate
  ): Promise<Collaboration | null>;

  deleteCollaboration(id: string): Promise<Collaboration | null>;

  listCollaborationsOfUser(userId: string): Promise<Collaboration[]>;

  listCollaborationsOfNote(noteId: string): Promise<Collaboration[]>;
}
