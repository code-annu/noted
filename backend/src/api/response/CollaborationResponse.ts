import { CollaborationRole } from "../../domain/entities/collaboration";

export interface CollaborationResponse {
  id: string;
  role: CollaborationRole;
  acceptedAt: Date | null;
  invitedAt: Date;
  note: {
    id: string;
    title: string;
  };
  invitedBy: {
    username: string;
    fullname: string;
  };
  user: {
    username: string;
    fullname: string;
  };
}
