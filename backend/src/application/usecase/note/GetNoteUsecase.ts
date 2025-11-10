import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteOutputDTO } from "../../dto/note-dto";

export class GetNoteUsecase {
  constructor(
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(noteId: string, userId: string): Promise<NoteOutputDTO> {
    const user = await this.userRepo.getUserId(userId);
    if (!user) throw new NotFoundError("User not found!");

    const note = await this.noteRepo.getNote(noteId);
    if (!note) throw new NotFoundError("Note not found!");

    if (note.ownerId !== userId) {
      throw new ForbiddenError("You are not authorized to view this note.");
    }

    const owner = await this.userRepo.getUserId(note.ownerId);

    return { note: note, owner: owner };
  }
}
