import type { LoginCredential, User } from "../../../domain/entities/user";
import type { IAuthRepository } from "../../../domain/repository/IAuthRepository";

export class LoginUsecase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(loginCred: LoginCredential): Promise<User> {
    return this.authRepo.loginUser(loginCred);
  }
}
