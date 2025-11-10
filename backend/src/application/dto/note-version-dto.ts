import { NoteVersion } from "../../domain/entities/note-version";
import { User } from "../../domain/entities/user";

export interface NoteVersionCreateInputDTO {
  noteId: string;
  content: string;
}

export interface NoteVersionUpdateInputDTO {
  content?: string;
}

export interface NoteVersionOutputDTO {
  noteVersion: NoteVersion;
  createdBy: User | null;
}
