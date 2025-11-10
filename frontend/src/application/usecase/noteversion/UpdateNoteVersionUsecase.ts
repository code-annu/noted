import type {
  NoteVersion,
  NoteVersionUpdate,
} from "../../../domain/entities/note-version";
import type { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";

export class UpdateNoteVersionUsecase {
  constructor(private readonly noteVersionRepo: INoteVersionRepository) {}

  async execute(
    noteVersionId: string,
    noteVersionUpdate: NoteVersionUpdate
  ): Promise<NoteVersion> {
    return await this.noteVersionRepo.updateNoteVersion(
      noteVersionId,
      noteVersionUpdate
    );
  }
}
