import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../../domain/entities/user";

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
