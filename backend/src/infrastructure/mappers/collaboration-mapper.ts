import {
  Collaboration,
  CollaborationRole,
} from "../../domain/entities/collaboration";
import { CollaborationDocument } from "../model/collaboration-model";

export function mapToCollaboration(
  collaborationDocument: CollaborationDocument
): Collaboration {
  const { _id, userId, notedId, createdAt, invitedBy, acceptedAt, role } =
    collaborationDocument;

  const collaboration: Collaboration = {
    id: _id.toString(),
    noteId: notedId.toString(),
    userId: userId.toString(),
    role: role as CollaborationRole,
    invitedBy: invitedBy.toString(),
    acceptedAt: acceptedAt,
    invitedAt: createdAt,
  };

  return collaboration;
}
