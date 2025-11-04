import { z } from "zod";

export const SignupInputSchema = z.object({
  username: z.string().trim().nonempty("username is required"),
  password: z.string().trim().nonempty("password is required"),
  fullname: z.string().trim().nonempty("fullname is required"),
  bio: z.string().trim().optional(),
  profilePictureUrl: z
    .string()
    .trim()
    .nonempty("profilePictureUrl is required"),
});

export const LoginInputSchema = z.object({
  username: z.string().trim().nonempty("username is required"),
  password: z.string().trim().nonempty("password is required"),
});

export const RefreshTokenSchema = z.object({
  token: z.string().trim().nonempty("token is required"),
});
