import { Router } from "express";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { AuthController } from "../controller/AuthController";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  LoginInputSchema,
  RefreshTokenSchema,
  SignupInputSchema,
} from "../schema/auth-schema";

export const authRouter = Router();

const authController = new AuthController(new UserRepository());

authRouter.post(
  "/signup",
  validateRequestBody(SignupInputSchema),
  authController.postSignup.bind(authController)
);

authRouter.post(
  "/login",
  validateRequestBody(LoginInputSchema),
  authController.postLogin.bind(authController)
);

authRouter.post(
  "/refresh-token",
  validateRequestBody(RefreshTokenSchema),
  authController.postRefreshToken.bind(authController)
);
