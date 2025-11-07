import { ConflictError } from "../../../domain/error/ConflictError";
import { UnprocessableError } from "../../../domain/error/UnprocessableError";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import bcrypt from "bcrypt";
import { generateTokens } from "../../../util/jwt-util";
import { SignupInputDTO, AuthOutputDTO } from "../../dto/auth-dto";

export class SignupUsecase {
  private SALT_ROUNDS = 10;

  constructor(private readonly userRepo: IUserRepository) {}

  async execute(signupInput: SignupInputDTO): Promise<AuthOutputDTO> {
    const user = await this.userRepo.getUserByUsername(signupInput.username);
    if (user) {
      throw new ConflictError(
        `User with username ${signupInput.username} is already exists. Please try with different username`
      );
    }
    if (signupInput.password.length < 6) {
      throw new UnprocessableError(
        "Password must be at least 6 characters long"
      );
    }

    const hashedPassword = await bcrypt.hash(
      signupInput.password,
      this.SALT_ROUNDS
    );


    const createdUser = await this.userRepo.createUser({
      username: signupInput.username,
      passwordHash: hashedPassword,
      fullname: signupInput.fullname,
      profilePictureUrl: signupInput.profilePictureUrl,
      bio: signupInput.bio ? signupInput.bio : null,
    });

    const { accessToken, refreshToken } = generateTokens({
      userId: createdUser.id,
      username: createdUser.username,
    });

    await this.userRepo.updateUser(createdUser.id, {
      refreshToken: refreshToken,
    });

    return {
      id: createdUser.id,
      username: createdUser.username,
      fullname: createdUser.fullname,
      bio: createdUser.bio,
      profilePictureUrl: createdUser.profilePictureUrl,
      refreshToken: refreshToken,
      accessToken: accessToken,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  }
}
