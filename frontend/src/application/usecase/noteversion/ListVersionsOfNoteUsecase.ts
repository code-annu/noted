import type { NoteVersion } from "../../../domain/entities/note-version";
import type { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";

export class ListVersionsOfNoteUsecase {
  constructor(private readonly noteVersionRepo: INoteVersionRepository) {}

  async execute(noteId: string): Promise<NoteVersion[]> {
    return await this.noteVersionRepo.listNoteVersions(noteId);
  }
}
