import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UnauthorizedError } from "../../../domain/error/UnauthorizedError";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { generateTokens, verifyRefreshToken } from "../../../util/jwt-util";
import { AuthOutputDTO } from "../../dto/auth-dto";

export class RefreshTokenUsecase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(token: string): Promise<AuthOutputDTO> {
    const decodedData = verifyRefreshToken(token);
    const user = await this.userRepo.getUserId(decodedData.userId);
    if (user == null) {
      throw new NotFoundError(
        `User not found! Account my be deleted or deactivated`
      );
    }

    console.log(`Refresh token ${user.refreshToken} and token is ${token}`);
    if (user.refreshToken != token) {
      throw new UnauthorizedError(
        "Refresh token not found! Maybe changed or expired. Try to login"
      );
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      username: user.username,
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
