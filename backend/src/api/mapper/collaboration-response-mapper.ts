import { CollaborationOutputDTO } from "../../application/dto/collaboration-dto";
import { CollaborationResponse } from "../response/CollaborationResponse";

export function mapToCollaborationResponse(
  collaborationOutput: CollaborationOutputDTO
): CollaborationResponse {
  const collaboration = collaborationOutput.collaboration;
  const invitedBy = collaborationOutput.invitedBy;
  const note = collaborationOutput.note;
  const user = collaborationOutput.user;

  const collaborationResponse: CollaborationResponse = {
    id: collaboration.id,
    role: collaboration.role,
    acceptedAt: collaboration.acceptedAt,
    invitedAt: collaboration.invitedAt,
    note: {
      id: note.id,
      title: note.title,
    },
    invitedBy: {
      username: invitedBy.username,
      fullname: invitedBy.fullname,
    },
    user: {
      username: user.username,
      fullname: user.fullname,
    },
  };

  return collaborationResponse;
}
