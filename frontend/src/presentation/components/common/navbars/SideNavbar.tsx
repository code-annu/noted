import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../../router";
import type { User } from "../../../../domain/entities/user";
import useAuth from "../../../../application/hook/useAuth";

interface SideNavbarProps {
  user: User;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ user }) => {
  const { logout } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    const doLogout = async () => {
      await logout();
      navigateTo(AppRoute.LOGIN);
    };

    doLogout();
  };

  const linkClassNames = ({ isActive }: { isActive: boolean }) =>
    `text-left px-4 py-2 rounded transition ${
      isActive ? "bg-blue-100 font-semibold" : "hover:bg-blue-50"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to={AppRoute.HOME} className={linkClassNames}>
          Home
        </NavLink>
        <NavLink to={`/${user.username}`} className={linkClassNames}>
          Profile
        </NavLink>
        <NavLink to={AppRoute.NOTES} className={linkClassNames}>
          Notes
        </NavLink>
        <NavLink to={AppRoute.COLLABORATIONS} className={linkClassNames}>
          My Collaboration
        </NavLink>

        <button
          onClick={handleLogout}
          className="text-left px-4 py-2 rounded text-red-500 hover:bg-red-100 transition"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SideNavbar;
