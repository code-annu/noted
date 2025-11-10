import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteVersionOutputDTO } from "../../dto/note-version-dto";

export class GetNoteVersionUsecase {
  constructor(
    private readonly noteVersionRepo: INoteVersionRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    noteVersionId: string,
    userId: string
  ): Promise<NoteVersionOutputDTO> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const noteVersion = await this.noteVersionRepo.getNoteVersion(
      noteVersionId
    );
    if (!noteVersion) throw new NotFoundError("Note version not found!");

    if (noteVersion.createdBy !== userId) {
      throw new ForbiddenError(
        "You are note authorized to view this note version."
      );
    }

    // const createdBy = await this.userRepo.getUserById(noteVersion.createdBy); // For future call when note have multiple collaborators

    return { noteVersion: noteVersion, createdBy: user };
  }
}
