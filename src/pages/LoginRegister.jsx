import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginRegister() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, role });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Login / Signup</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
        </select>
        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login / Signup
        </button>
      </form>
    </div>
  );
}

