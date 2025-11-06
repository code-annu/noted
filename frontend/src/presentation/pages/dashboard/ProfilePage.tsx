import { useAuthContext } from "../../../application/context/auth/AuthContext";

function ProfilePage() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium">
          No user data available. Please log in.
        </p>
      </div>
    );
  }

  const { username, fullname, profilePictureUrl, bio, createdAt } = user;

  // Format creation date to readable form
  const createdDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex flex-col items-center">
        <img
          src={profilePictureUrl}
          alt={`${fullname}'s profile`}
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md mb-5"
          onError={(e) => {
            // Fallback to default image on error
            (e.target as HTMLImageElement).src = "/default-profile.png";
          }}
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{fullname}</h1>
        <p className="text-indigo-600 text-lg mb-4">@{username}</p>
        {bio && (
          <p className="text-center text-gray-700 mb-6 px-4 leading-relaxed">
            {bio}
          </p>
        )}
        <p className="text-sm text-gray-500 italic">
          Profile created on {createdDate}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
