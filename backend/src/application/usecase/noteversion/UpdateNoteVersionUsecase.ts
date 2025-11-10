import { DatabaseError } from "../../../domain/error/DatabaseError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import {
  NoteVersionOutputDTO,
  NoteVersionUpdateInputDTO,
} from "../../dto/note-version-dto";

interface NoteUpdate {
  content?: string;
}
export class UpdateNoteVersionUsecase {
  constructor(
    private readonly noteVersionRepo: INoteVersionRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    noteVersionId: string,
    updates: NoteVersionUpdateInputDTO,
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
        "You are not authorized to update this note version."
      );
    }

    const updatedNoteVersion = await this.noteVersionRepo.updateNoteVersion(
      noteVersionId,
      { content: updates.content }
    );

    if (!updatedNoteVersion) {
      throw new DatabaseError("Failed to update note version");
    }

    return { noteVersion: updatedNoteVersion, createdBy: user };
  }
}
