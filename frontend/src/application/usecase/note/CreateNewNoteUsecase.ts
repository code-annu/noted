import type { Note, NoteCreate } from "../../../domain/entities/note";
import type { INoteRepository } from "../../../domain/repository/INoteRepository";

export class CreateNewNoteUsecase {
  constructor(private readonly noteRepo: INoteRepository) {}

  async execute(noteCreate: NoteCreate): Promise<Note> {
    return this.noteRepo.createNote(noteCreate);
  }
}
