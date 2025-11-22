import { useDispatch } from "react-redux";
import { AuthRepository } from "../../data/repository/AuthRepository";
import type {
  LoginCredential,
  SignupCredential,
} from "../../domain/entities/user";
import { LoginUsecase } from "../usecase/auth/LoginUsecase";
import { SignupUsecase } from "../usecase/auth/SignupUsecase";
import { setUser } from "../../features/auth/authSlice";
import { StorageUtil } from "../../util/StorageUtil";
import { RefreshTokenUsecase } from "../usecase/auth/RefreshTokenUsecase";

function useAuth() {
  const authRepo = new AuthRepository();
  const dispatch = useDispatch();

  const signup = async (cred: SignupCredential) => {
    const signupUsecase = new SignupUsecase(authRepo);
    const authUser = await signupUsecase.execute(cred);
    dispatch(setUser({ user: authUser }));
    StorageUtil.saveAccessToken(authUser.accessToken);
    StorageUtil.saveRefreshToken(authUser.refreshToken);
  };

  const login = async (cred: LoginCredential) => {
    const loginUsecase = new LoginUsecase(authRepo);
    const authUser = await loginUsecase.execute(cred);
    dispatch(setUser({ user: authUser }));
    StorageUtil.saveAccessToken(authUser.accessToken);
    StorageUtil.saveRefreshToken(authUser.refreshToken);
  };

  const refreshToken = async () => {
    const refreshTokenUsecase = new RefreshTokenUsecase(authRepo);
    const token = StorageUtil.getRefreshToken();
    if (token) {
      const authUser = await refreshTokenUsecase.execute(token);
      dispatch(setUser({ user: authUser }));
      StorageUtil.saveAccessToken(authUser.accessToken);
      StorageUtil.saveRefreshToken(authUser.refreshToken);
    }
  };

  const logout = async () => {
    dispatch(setUser({ user: null }));
    StorageUtil.clearTokens();
  };

  return { signup, login, refreshToken, logout };
}

export default useAuth;
