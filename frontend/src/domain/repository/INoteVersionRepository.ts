import type {
  NoteVersion,
  NoteVersionCreate,
  NoteVersionUpdate,
} from "../entities/note-version";

export interface INoteVersionRepository {
  createNoteVersion(noteVersionCreate: NoteVersionCreate): Promise<NoteVersion>;

  getNoteVersion(id: string): Promise<NoteVersion>;

  updateNoteVersion(
    id: string,
    updates: NoteVersionUpdate
  ): Promise<NoteVersion>;

  listNoteVersions(noteId: string): Promise<NoteVersion[]>;
}
