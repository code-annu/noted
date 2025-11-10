import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteOutputDTO } from "../../dto/note-dto";

export class ListNotesOfUserUsecase {
  constructor(
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(userId: string): Promise<NoteOutputDTO[]> {
    const user = await this.userRepo.getUserId(userId);
    if (!user) throw new NotFoundError("User not found!");

    const notes = await this.noteRepo.listNotesOfUser(userId);
    const notesOutput: NoteOutputDTO[] = [];
    for (const note of notes) {
      const owner = await this.userRepo.getUserId(note.ownerId);
      notesOutput.push({ note: note, owner: owner });
    }
    return notesOutput;
  }
}
