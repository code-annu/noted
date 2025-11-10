import { AxiosError } from "axios";
import { AuthRepository } from "../../data/repository/AuthRepository";
import type {
  LoginCredential,
  SignupCredential,
} from "../../domain/entities/user";
import { useAuthContext } from "../context/auth/AuthContext";
import { SignupUsecase } from "../usecase/auth/SignupUsecase";
import { useState } from "react";
import { StorageUtil } from "../../util/StorageUtil";
import { LoginUsecase } from "../usecase/auth/LoginUsecase";
import { RefreshTokenUsecase } from "../usecase/auth/RefreshTokenUsecase";

function useAuth() {
  const authRepo = new AuthRepository();
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signup = async (signupCred: SignupCredential) => {
    const signupUsecase = new SignupUsecase(authRepo);
    try {
      setLoading(true);
      const authUser = await signupUsecase.execute(signupCred);
      setUser(authUser);
      StorageUtil.saveAccessToken(authUser.accessToken);
      StorageUtil.saveRefreshToken(authUser.refreshToken);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const login = async (loginCred: LoginCredential) => {
    const loginUsecase = new LoginUsecase(authRepo);
    try {
      setLoading(true);
      const authUser = await loginUsecase.execute(loginCred);
      setUser(authUser);
      StorageUtil.saveAccessToken(authUser.accessToken);
      StorageUtil.saveRefreshToken(authUser.refreshToken);
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  const refreshToken = async (): Promise<boolean> => {
    const refreshTokenUsecase = new RefreshTokenUsecase(authRepo);
    try {
      const token = StorageUtil.getRefreshToken();
      if (!token) return false;

      const authUser = await refreshTokenUsecase.execute(token);
      setUser(authUser);
      StorageUtil.saveAccessToken(authUser.accessToken);
      StorageUtil.saveRefreshToken(authUser.refreshToken);
      return true;
    } catch (err) {
      handleError(err);
      return false;
    }
  };

  const logout = async () => {};

  const handleError = (err: any) => {
    if (err instanceof AxiosError) {
      setError(err.response?.data.error);
    } else {
      setError((err as Error).message);
    }
  };

  return { user, error, signup, login, refreshToken, logout, loading };
}

export default useAuth;
