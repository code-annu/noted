export interface Collaboration {
  id: string;
  noteId: string;
  userId: string;
  role: CollaborationRole; 
  invitedBy: string;
  acceptedAt: Date | null;
  invitedAt: Date;
}

export enum CollaborationRole {
  VIEWER = "viewer",
  EDITOR = "editor",
}

export interface CollaborationCreate {
  notedId: string;
  userId: string;
  role: CollaborationRole;
  invitedBy: string;
}

export interface CollaborationUpdate {
  role?: CollaborationRole;
  acceptedAt?: Date;
}
