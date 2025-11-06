import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../application/hooks/use-auth";
import { useEffect } from "react";
import { AppRoute } from "../../router";
import SideNavbar from "../components/common/SideNavbar";

function DashboardLayout() {
  const { refreshToken } = useAuth();
  const navigateTo = useNavigate();

  useEffect(() => {
    refreshToken().then((result) => {
      if (!result) navigateTo(AppRoute.LOGIN);
    });
    
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
