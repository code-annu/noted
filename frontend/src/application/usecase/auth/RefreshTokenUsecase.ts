import type { User } from "../../../domain/entities/user";
import type { IAuthRepository } from "../../../domain/repository/IAuthRepository";

export class RefreshTokenUsecase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(token: string): Promise<User> {
    return this.authRepo.refreshToken(token);
  }
}
