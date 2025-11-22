import type {
  CollaborationCreate,
  Collaboration,
} from "../../domain/entities/collaboration";
import type { ICollaborationRepository } from "../../domain/repository/ICollaborationRepository";
import { deleteRequest } from "../datasource/api/delete-client";
import { getRequest } from "../datasource/api/get-client";
import { patchRequest } from "../datasource/api/patch-client";
import { postRequest } from "../datasource/api/post-client";

export class CollaborationRepository implements ICollaborationRepository {
  async createCollaboration(
    noteId: string,
    collaborationCreate: CollaborationCreate
  ): Promise<Collaboration> {
    return await postRequest<Collaboration>(
      `/notes/${noteId}/invite`,
      collaborationCreate
    );
  }

  async getCollaboration(id: string): Promise<Collaboration> {
    throw new Error("Method not implemented.");
  }

  async getMyCollaborations(): Promise<Collaboration[]> {
    return await getRequest<Collaboration[]>("/collaborations");
  }

  async acceptCollaboration(id: string): Promise<Collaboration> {
    return await patchRequest<Collaboration>(`/collaborations/${id}/accept`);
  }

  async getNotesCollaborations(noteId: string): Promise<Collaboration[]> {
    return await getRequest<Collaboration[]>(`/notes/${noteId}/collaborations`);
  }

  async rejectCollaboration(id: string) {
    await deleteRequest(`collaborations/${id}/reject`);
  }
}
