import type { SignupCredential, User } from "../../../domain/entities/user";
import type { IAuthRepository } from "../../../domain/repository/IAuthRepository";

export class SignupUsecase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(signupCred: SignupCredential): Promise<User> {
    return this.authRepo.signupUser(signupCred);
  }
}
