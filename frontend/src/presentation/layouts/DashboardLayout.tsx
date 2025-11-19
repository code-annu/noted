import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppRoute } from "../../router";
import SideNavbar from "../components/common/navbars/SideNavbar";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import useAuth from "../../application/hook/useAuth";
import { CenteredLoadingMessage } from "../components/common/messages/CenteredLoadingMessage";

function DashboardLayout() {
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
    if (!user) {
      refresh();
    }
  }, []);

  if (refreshingToken) {
    return <CenteredLoadingMessage />;
  }

  if (!user) {
    navigateTo(AppRoute.LOGIN);
    return;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar user={user} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
