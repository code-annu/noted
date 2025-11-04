import { User } from "../../domain/entities/user";
import { UserDocument } from "../model/user-model";

export function mapToUser(userDocument: UserDocument): User {
  const {
    _id,
    username,
    passwordHash,
    fullname,
    profilePictureUrl,
    bio,
    createdAt,
    updatedAt,
    refreshToken,
  } = userDocument;

  const user: User = {
    id: _id.toString(),
    username: username,
    passwordHash: passwordHash,
    fullname: fullname,
    profilePictureUrl: profilePictureUrl,
    bio: bio,
    refreshToken: refreshToken,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };

  return user;
}
