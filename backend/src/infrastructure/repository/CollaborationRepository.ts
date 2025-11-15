import {
  CollaborationCreate,
  Collaboration,
  CollaborationUpdate,
} from "../../domain/entities/collaboration";
import { ICollaborationRepository } from "../../domain/repository/ICollaborationRepository";
import { mapToCollaboration } from "../mappers/collaboration-mapper";
import { CollaborationModel } from "../model/collaboration-model";

export class CollaborationRepository implements ICollaborationRepository {
  async createCollaboration(
    collaboratorCreate: CollaborationCreate
  ): Promise<Collaboration> {
    const collaborator = new CollaborationModel(collaboratorCreate);
    const savedCollaborator = await collaborator.save();
    return mapToCollaboration(savedCollaborator);
  }

  async getCollaboration(id: string): Promise<Collaboration | null> {
    const collaborator = await CollaborationModel.findById(id);
    return collaborator ? mapToCollaboration(collaborator) : null;
  }

  async updateCollaboration(
    id: string,
    updates: CollaborationUpdate
  ): Promise<Collaboration | null> {
    const collaborator = await CollaborationModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    return collaborator ? mapToCollaboration(collaborator) : null;
  }

  async deleteCollaboration(id: string): Promise<Collaboration | null> {
    const collaborator = await CollaborationModel.findByIdAndDelete(id);
    return collaborator ? mapToCollaboration(collaborator) : null;
  }

  async listCollaborationsOfUser(userId: string): Promise<Collaboration[]> {
    const collaborations = await CollaborationModel.find({
      userId: userId,
    });
    return collaborations.map((collaborationDocument) =>
      mapToCollaboration(collaborationDocument)
    );
  }

  async listCollaborationsOfNote(noteId: string): Promise<Collaboration[]> {
    const collaborations = await CollaborationModel.find({ notedId: noteId });

    return collaborations.map((collaborationDocument) =>
      mapToCollaboration(collaborationDocument)
    );
  }
}
