import { DatabaseError } from "../../../domain/error/DatabaseError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteOutputDTO, NoteUpdateInputDTO } from "../../dto/note-dto";

export class UpdateNoteUsecase {
  constructor(
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    noteId: string,
    updates: NoteUpdateInputDTO,
    userId: string
  ): Promise<NoteOutputDTO> {
    const user = await this.userRepo.getUserId(userId);
    if (!user) throw new NotFoundError("User not found!");

    const note = await this.noteRepo.getNote(noteId);
    if (!note) throw new NotFoundError("Note not found!");

    if (note.ownerId !== userId) {
      throw new ForbiddenError("You are not authorized to update this note.");
    }

    const updatedNote = await this.noteRepo.updateNote(noteId, updates);
    if (!updatedNote) {
      throw new DatabaseError("Unable to update note");
    }

    const owner = await this.userRepo.getUserId(note.ownerId);

    return { note: updatedNote, owner: owner };
  }
}
