import { User, UserCreate, UserUpdate } from "../entities/user";

export interface IUserRepository {
  createUser(userCreate: UserCreate): Promise<User>;

  getUserById(id: string): Promise<User | null>;

  getUserByUsername(username: string): Promise<User | null>;

  updateUser(id: string, updates: UserUpdate): Promise<User | null>;

  deleteUser(id: string): Promise<User | null>;
}
