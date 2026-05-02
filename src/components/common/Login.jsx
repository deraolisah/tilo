import React, { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, fake authentication
    if (email && password) {
      login({ email }); // store user info
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn bg-blue-600 text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;