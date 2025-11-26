import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>No user info available.</p>
      )}
    </div>
  );
}

