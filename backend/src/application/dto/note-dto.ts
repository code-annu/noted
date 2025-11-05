import { Note } from "../../domain/entities/note";
import { User } from "../../domain/entities/user";

export interface NoteCreateInputDTO {
  title: string;
  currentContent: String;
  ownerId: string;
}

export interface NoteUpdateInputDTO
  extends Pick<NoteCreateInputDTO, "title" | "currentContent"> {}

export interface NoteOutputDTO {
  note: Note;
  owner: User;
}
