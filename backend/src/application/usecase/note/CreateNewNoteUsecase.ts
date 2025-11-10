import { Note } from "../../../domain/entities/note";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteCreateInputDTO, NoteOutputDTO } from "../../dto/note-dto";

export class CreateNewNoteUsecase {
  constructor(
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(noteInput: NoteCreateInputDTO): Promise<NoteOutputDTO> {
    const user = await this.userRepo.getUserId(noteInput.ownerId);
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const note = await this.noteRepo.createNote({
      title: noteInput.title,
      currentContent: noteInput.currentContent,
      ownerId: noteInput.ownerId,
      isPublic: false,
    });

    return { note: note, owner: user };
  }
}
