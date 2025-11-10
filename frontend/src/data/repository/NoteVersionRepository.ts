import type {
  NoteVersionCreate,
  NoteVersion,
  NoteVersionUpdate,
} from "../../domain/entities/note-version";
import type { INoteVersionRepository } from "../../domain/repository/INoteVersionRepository";
import { getRequest } from "../datasource/api/get-client";
import { patchRequest } from "../datasource/api/patch-client";
import { postRequest } from "../datasource/api/post-client";

export class NoteVersionRepository implements INoteVersionRepository {
  async createNoteVersion(
    noteVersionCreate: NoteVersionCreate
  ): Promise<NoteVersion> {
    const noteVersion = postRequest<NoteVersion>(
      "/noteversions",
      noteVersionCreate
    );
    return noteVersion;
  }

  async getNoteVersion(id: string): Promise<NoteVersion> {
    return getRequest<NoteVersion>(`/noteversions/${id}`);
  }

  async updateNoteVersion(
    id: string,
    updates: NoteVersionUpdate
  ): Promise<NoteVersion> {
    return patchRequest<NoteVersion>(`/noteversions/${id}`, updates);
  }

  async listNoteVersions(noteId: string): Promise<NoteVersion[]> {
    return getRequest<NoteVersion[]>(`/notes/${noteId}/versions`);
  }
}
