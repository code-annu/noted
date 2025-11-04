import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IUserRepository } from "../../../domain/repository/IUserRepository";

export class DeleteUserUsecase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepo.deleteUser(userId);
    if (!user) throw new NotFoundError("User not found!");
  }
}
