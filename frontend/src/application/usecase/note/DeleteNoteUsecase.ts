import type { Note } from "../../../domain/entities/note";
import type { INoteRepository } from "../../../domain/repository/INoteRepository";

export class DeleteNoteUsecase {
  constructor(private readonly noteRepo: INoteRepository) {}

  async execute(noteId: string): Promise<Note> {
    return this.noteRepo.deleteNote(noteId);
  }
}
