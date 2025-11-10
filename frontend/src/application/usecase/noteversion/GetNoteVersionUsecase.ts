import type { NoteVersion } from "../../../domain/entities/note-version";
import type { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";

export class GetNoteVersionUsecase {
  constructor(private readonly noteVersionRepo: INoteVersionRepository) {}

  async execute(noteVersionId: string): Promise<NoteVersion> {
    return await this.noteVersionRepo.getNoteVersion(noteVersionId);
  }
}
