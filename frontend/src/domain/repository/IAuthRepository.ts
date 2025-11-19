import type { LoginCredential, SignupCredential, User } from "../entities/user";

export interface IAuthRepository {
  signupUser(signupCred: SignupCredential): Promise<User>;

  loginUser(loginCred: LoginCredential): Promise<User>;

  refreshToken(token: string): Promise<User>;
}
