import { Document, Schema, Types, model } from "mongoose";

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username: string;
  passwordHash: string;
  fullname: string;
  profilePictureUrl: string;
  bio: string | null;
  refreshToken: string | null;
  updatedAt: Date;
  createdAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      maxLength: [100, "Username cannot exceed the length of 100"],
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
    },
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      maxLength: [200, "Full name cannot exceed the length of 200"],
      trim: true,
    },
    profilePictureUrl: {
      type: String,
      required: [true, "Profile picture URL is required"],
      trim: true,
    },
    bio: {
      type: String,
      default: null,
      trim: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// If you want, you can add indexes, virtuals, methods, etc.
// UserSchema.index({ username: 1 });

export const UserModel = model<UserDocument>("User", UserSchema);
