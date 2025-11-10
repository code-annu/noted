import { User } from "../../../domain/entities/user";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IUserRepository } from "../../../domain/repository/IUserRepository";

export class GetMyProfileUsecase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new NotFoundError("User not found!");
    }

    return user;
  }
}
