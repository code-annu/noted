import type { NoteCreate, Note, NoteUpdate } from "../../domain/entities/note";
import type { INoteRepository } from "../../domain/repository/INoteRepository";
import { deleteRequest } from "../datasource/api/delete-client";
import { getRequest } from "../datasource/api/get-client";
import { patchRequest } from "../datasource/api/patch-client";
import { postRequest } from "../datasource/api/post-client";

export class NoteRepository implements INoteRepository {
  async createNote(noteCreate: NoteCreate): Promise<Note> {
    return await postRequest<Note>("/notes", noteCreate);
  }

  async getNote(id: string): Promise<Note> {
    return await getRequest<Note>(`/notes/${id}`);
  }

  async updateNote(id: string, updates: NoteUpdate): Promise<Note> {
    return patchRequest<Note>(`/notes/${id}`, updates);
  }

  async deleteNote(id: string): Promise<Note> {
    return deleteRequest<Note>(`/notes/${id}`);
  }

  async listNotes(): Promise<Note[]> {
    return getRequest<Note[]>("/notes");
  }
}
