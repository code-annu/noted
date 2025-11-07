import type { Note } from "../../../domain/entities/note";
import type { INoteRepository } from "../../../domain/repository/INoteRepository";

export class GetNoteUsecase {
  constructor(private readonly noteRepo: INoteRepository) {}

  async execute(noteId: string): Promise<Note> {
    return this.noteRepo.getNote(noteId);
  }
}
