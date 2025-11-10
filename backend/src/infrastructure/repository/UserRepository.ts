import { UserCreate, User, UserUpdate } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { mapToUser } from "../mappers/user-mapper";
import { UserModel } from "../model/user-model";

export class UserRepository implements IUserRepository {
  async createUser(userCreate: UserCreate): Promise<User> {
    const newUser = new UserModel(userCreate);
    const userDocument = await newUser.save();
    return mapToUser(userDocument.toObject());
  }

  async getUserById(id: string): Promise<User | null> {
    const userDocument = await UserModel.findById(id);
    return userDocument ? mapToUser(userDocument.toObject()) : null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({ username: username });
    return userDocument ? mapToUser(userDocument.toObject()) : null;
  }

  async updateUser(id: string, updates: UserUpdate): Promise<User | null> {
    const userDocument = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return userDocument ? mapToUser(userDocument.toObject()) : null;
  }

  async deleteUser(id: string): Promise<User | null> {
    const userDocument = await UserModel.findByIdAndDelete(id);
    return userDocument ? mapToUser(userDocument.toObject()) : null;
  }
}
