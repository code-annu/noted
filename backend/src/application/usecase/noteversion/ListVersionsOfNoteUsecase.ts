import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteVersionOutputDTO } from "../../dto/note-version-dto";

export class ListVersionsOfNoteUsecase {
  constructor(
    private readonly noteVersionRepo: INoteVersionRepository,
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    noteId: string,
    userId: string
  ): Promise<NoteVersionOutputDTO[]> {
    const user = await this.userRepo.getUserId(userId);
    if (!user) throw new NotFoundError("User not found!");

    const note = await this.noteRepo.getNote(noteId);
    if (!note) throw new NotFoundError("Note not found!");

    if (note.ownerId !== user.id) {
      throw new ForbiddenError(
        "You are not authorized view versions for this note."
      );
    }

    const noteVersions = await this.noteVersionRepo.listAllNoteVersions(noteId);

    return noteVersions.map((noteVersion) => {
      return { ...noteVersion };
    });
  }
}
