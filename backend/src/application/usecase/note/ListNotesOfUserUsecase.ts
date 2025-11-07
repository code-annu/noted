import { Note } from "../../../domain/entities/note";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";

export class ListNotesOfUserUsecase {
  constructor(
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(userId: string): Promise<Note[]> {
    const user = await this.userRepo.getUserId(userId);
    if (!user) throw new NotFoundError("User not found!");

    return this.noteRepo.listNotesOfUser(userId);
  }
}
