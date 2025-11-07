import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../application/hooks/use-auth";
import { AppRoute } from "../../../../router";

const SideNavbar: React.FC = () => {
  const { logout, user } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
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
