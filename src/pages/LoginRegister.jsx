import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true); // toggle login/register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth(); // from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // LOGIN
        const data = await loginUser({ email, password });
        login(data.token); // sets token and context
      } else {
        // REGISTER
        const data = await registerUser({ name, email, password });
        login(data.token);
      }
      // Redirect to dashboard/home
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            isLogin ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
          } transition`}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="mt-3 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
