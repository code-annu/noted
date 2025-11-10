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

  listAllNoteVersions(noteId: string): Promise<NoteVersion[]>;
}
