import { Note, NoteCreate, NoteUpdate } from "../entities/note";

export interface INoteRepository {
  createNote(noteCreate: NoteCreate): Promise<Note>;

  getNote(id: string): Promise<Note | null>;

  updateNote(id: string, updates: NoteUpdate): Promise<Note | null>;

  deleteNote(id: string): Promise<Note | null>;

  listNotesOfUser(userId: string): Promise<Note[]>;
}
