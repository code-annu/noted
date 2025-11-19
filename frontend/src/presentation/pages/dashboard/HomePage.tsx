import type React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div></div>;
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
