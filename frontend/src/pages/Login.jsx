import React from "react";
import { Link, useNavigate } from "react-router";

const Login = ({ email, setEmail, password, setPassword, setUser }) => {
  const URL = import.meta.env.VITE_API_URL;

  const router = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    const newEmail = emailRegex.test(email);
    const newPassword = passwordRegex.test(password);

    if (!newEmail) {
      alert("Please enter a valid email.");
      return;
    }

    if (!newPassword) {
      alert("Password must be at least 8 characters.");
      return;
    }

    try {
      // Login
      const response = await fetch(`${URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        alert(data.message);
        return;
      }

      // Get the currently logged-in user
      const responseData = await fetch(`${URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const currentUser = await responseData.json();

      if (!responseData.ok) {
        console.error(currentUser.message);
        alert(currentUser.message);
        return;
      }

      // Save logged-in user
      setUser(currentUser);

      // Clear login form
      setEmail("");
      setPassword("");

      // Navigate to home
      router("/");
    } catch (err) {
      // console.error(err);
      // alert("Something went wrong while logging in.");
      console.error("LOGIN ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <form className="Login" onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>

      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>

      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" className="btn">
        <Link to="/register">Register Instead</Link>
      </button>

      <button type="submit" className="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
