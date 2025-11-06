import type {
  SignupCredential,
  User,
  LoginCredential,
} from "../../domain/entities/user";
import type { IAuthRepository } from "../../domain/repository/IAuthRepository";
import { postRequest } from "../datasource/api/post-client";

export class AuthRepository implements IAuthRepository {
  async signupUser(signupCred: SignupCredential): Promise<User> {
    const response = await postRequest<User>("/auth/signup", signupCred);
    return response;
  }

  async loginUser(loginCred: LoginCredential): Promise<User> {
    return postRequest<User>("/auth/login", loginCred);
  }

  async refreshToken(token: string): Promise<User> {
    return postRequest<User>("/auth/refresh-token", { token: token });
  }
}
