import type {
  NoteVersion,
  NoteVersionCreate,
} from "../../../domain/entities/note-version";
import type { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";

export class CreateNewNoteVersionUsecase {
  constructor(private readonly noteVersionRepo: INoteVersionRepository) {}

  async execute(noteVersionCreate: NoteVersionCreate): Promise<NoteVersion> {
    return await this.noteVersionRepo.createNoteVersion(noteVersionCreate);
  }
}
