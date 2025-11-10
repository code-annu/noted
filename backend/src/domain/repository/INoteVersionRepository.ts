import {
  NoteVersion,
  NoteVersionCreate,
  NoteVersionUpdate,
} from "../entities/note-version";

export interface INoteVersionRepository {
  createNoteVersion(noteVersionCreate: NoteVersionCreate): Promise<NoteVersion>;

  getNoteVersion(id: string): Promise<NoteVersion | null>;

  updateNoteVersion(
    id: string,
    updates: NoteVersionUpdate
  ): Promise<NoteVersion | null>;

  deleteNoteVersion(id: string): Promise<NoteVersion | null>;

  deleteNoteVersions(noteId: string): Promise<void>;

  listAllNoteVersions(noteId: string): Promise<NoteVersion[]>;
}
