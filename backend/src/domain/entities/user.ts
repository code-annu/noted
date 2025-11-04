export interface User {
  id: string;
  username: string;
  passwordHash: string;
  fullname: string;
  profilePictureUrl: string;
  bio: string | null;
  refreshToken?: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export interface UserCreate
  extends Pick<
    User,
    "username" | "bio" | "fullname" | "passwordHash" | "profilePictureUrl"
  > {}

export interface UserUpdate
  extends Partial<
    Pick<User, "bio" | "fullname" | "profilePictureUrl" | "refreshToken">
  > {}
