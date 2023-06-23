import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://techinfo.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.msg);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label className="text-lg">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="text-lg">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <button
        onClick={() => navigate("/register")}
        className="text-blue-500 mt-4 underline block mx-auto"
      >
        Not registered yet? Click here
      </button>
    </div>
  );
};

export default AuthPage;
