import { Note } from "../../domain/entities/note";
import { User } from "../../domain/entities/user";

export interface NoteCreateInputDTO {
  title: string;
  currentContent: string;
  ownerId: string;
}

export interface NoteUpdateInputDTO
  extends Pick<NoteCreateInputDTO, "title" | "currentContent"> {}

export interface NoteOutputDTO {
  note: Note;
  owner: User | null;
  // id: string;
  // title: string;
  // currentContent: string;
  // isPublic: Boolean;
  // createdAt: Date;
  // updatedAt: Date;
  // owner: {
  //   username: string;
  //   fullname: string;
  // };
}
