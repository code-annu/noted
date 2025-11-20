import type { Note, NoteUpdate } from "../../../domain/entities/note";
import type { INoteRepository } from "../../../domain/repository/INoteRepository";

export class UpdateNoteUsecase {
  constructor(private readonly noteRepo: INoteRepository) {}

  async execute(noteId: string, noteUpdate: NoteUpdate): Promise<Note> {
    return this.noteRepo.updateNote(noteId, noteUpdate);
  }
}
