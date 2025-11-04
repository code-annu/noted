import { NextFunction } from "express";
import { LoginUsecase } from "../../application/usecase/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../../application/usecase/auth/RefreshTokenUsecase";
import { SignupUsecase } from "../../application/usecase/auth/SignupUsecase";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { Request, Response } from "express";

export class AuthController {
  private signup: SignupUsecase;
  private login: LoginUsecase;
  private refreshToken: RefreshTokenUsecase;

  constructor(userRepo: IUserRepository) {
    this.signup = new SignupUsecase(userRepo);
    this.login = new LoginUsecase(userRepo);
    this.refreshToken = new RefreshTokenUsecase(userRepo);
  }

  async postSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, bio, profilePictureUrl, fullname } = req.body;
      const response = await this.signup.execute({
        username: username,
        password: password,
        fullname: fullname,
        bio: bio,
        profilePictureUrl: profilePictureUrl,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const response = await this.login.execute({
        username: username,
        password: password,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async postRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      console.log(`Token from here ${token}`);
      const response = await this.refreshToken.execute(token);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
