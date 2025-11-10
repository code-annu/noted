import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import {
  NoteVersionCreateInputDTO,
  NoteVersionOutputDTO,
} from "../../dto/note-version-dto";

export class CreateNewNoteVersionUsecase {
  constructor(
    private readonly noteVersionRepo: INoteVersionRepository,
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    userId: string,
    noteVersionInput: NoteVersionCreateInputDTO
  ): Promise<NoteVersionOutputDTO> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const note = await this.noteRepo.getNote(noteVersionInput.noteId);
    if (!note) throw new NotFoundError("Note not found!");

    if (note.ownerId !== user.id) {
      throw new ForbiddenError(
        "You are not authorized create version for this note. Only owner can create versions"
      );
    }

    const allNoteVersions = await this.noteVersionRepo.listAllNoteVersions(
      noteVersionInput.noteId
    );
    let versionNumber = allNoteVersions.length + 1;

    const noteVersion = await this.noteVersionRepo.createNoteVersion({
      noteId: noteVersionInput.noteId,
      versionNumber: versionNumber,
      content: noteVersionInput.content,
      createdBy: userId,
    });

    return { noteVersion: noteVersion, createdBy: user };
  }
}
