import { useAuthContext } from "../../../application/context/auth/AuthContext";

function HomePage() {
  const { user } = useAuthContext();

  if (!user) return;

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
}

export default HomePage;
