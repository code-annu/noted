export interface Collaboration {
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

export enum CollaborationRole {
  VIEWER = "viewer",
  EDITOR = "editor",
}

export interface CollaborationCreate {
  username: string;
  role: CollaborationRole;
}
