import {
  Collaboration,
  CollaborationRole,
} from "../../domain/entities/collaboration";
import { Note } from "../../domain/entities/note";
import { User } from "../../domain/entities/user";

export interface CollaborationCreateInputDTO {
  username: string;
  role: CollaborationRole;
}

export interface CollaborationUpdateInputDTO {
  role?: CollaborationRole;
  acceptedAt?: Date;
}

export interface CollaborationOutputDTO {
  note: Note;
  invitedBy: User;
  user: User;
  collaboration: Collaboration;
}
