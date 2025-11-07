import type { Note, NoteCreate, NoteUpdate } from "../entities/note";

export interface INoteRepository {
  createNote(noteCreate: NoteCreate): Promise<Note>;

  getNote(id: string): Promise<Note>;

  updateNote(id: string, updates: NoteUpdate): Promise<Note>;

  deleteNote(id: string): Promise<Note>;

  listNotes(): Promise<Note[]>;
}
