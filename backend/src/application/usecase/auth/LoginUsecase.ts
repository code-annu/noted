import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { generateTokens } from "../../../util/jwt-util";
import { AuthOutputDTO, LoginInputDTO } from "../../dto/auth-dto";
import bcrypt from "bcrypt";

export class LoginUsecase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(loginInput: LoginInputDTO): Promise<AuthOutputDTO> {
    const user = await this.userRepo.getUserByUsername(loginInput.username);
    if (!user) {
      throw new NotFoundError(
        `User with username ${loginInput.username} not found. Try to signup`
      );
    }

    const matched = await bcrypt.compare(
      loginInput.password,
      user.passwordHash
    );

    if (!matched) {
      throw new UnauthorizedError(
        "Invalid user password. Please try again with another password"
      );
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      username: user.username,
    });

    await this.userRepo.updateUser(user.id, {
      refreshToken: refreshToken,
    });

    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      bio: user.bio,
      profilePictureUrl: user.profilePictureUrl,
      refreshToken: refreshToken,
      accessToken: accessToken,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
