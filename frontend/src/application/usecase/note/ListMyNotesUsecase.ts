import type { Note } from "../../../domain/entities/note";
import type { INoteRepository } from "../../../domain/repository/INoteRepository";

export class ListMyNotesUsecase {
  constructor(private readonly noteRepo: INoteRepository) {}

  async execute(): Promise<Note[]> {
    return this.noteRepo.listNotes();
  }
}
