import { createContext, useContext } from "react";
import type { User } from "../../../domain/entities/user";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext)!;
};
