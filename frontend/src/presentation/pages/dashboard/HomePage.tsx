import type React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import useAuth from "../../../application/hook/useAuth";
import { CenteredLoadingMessage } from "../../components/common/messages/CenteredLoadingMessage";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";

export const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { refreshToken } = useAuth();
  const [refreshingToken, setRefreshingToken] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      setRefreshingToken(true);
      try {
        await refreshToken();
      } catch (err) {
        console.log(err);
      }
      setRefreshingToken(false);
    };
    refresh();
  }, []);

  if (refreshingToken) {
    return <CenteredLoadingMessage />;
  }

  if (!user) {
    navigateTo(AppRoute.LOGIN);
    return;
  }

  const firstName = user.fullname.split(" ")[0] || "User";
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome, {firstName}!</h1>
      <p className="mb-2">
        This is a simple note-creating app where you can create notes, share
        them with friends, and collaborate on notes together.
      </p>
      <p>Start by creating or opening a note to get things started.</p>
    </div>
  );
};
