import React from "react";
import { Link, useNavigate } from "react-router";
const Register = ({
  username,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const router = useNavigate();

  const handleRegister = async (e) => {
    const URL = import.meta.env.VITE_API_URL;
    e.preventDefault();

    const nameRegex = /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    const newName = nameRegex.test(username);
    const newEmail = emailRegex.test(email);
    const newPassword = passwordRegex.test(password);

    if (!newName) {
      alert(
        "Provide a valid name start with capital no special chars allowed.",
      );
      return;
    } else if (!newEmail) {
      alert("Please enter a valid email.");
      return;
    } else if (!newPassword) {
      alert("Enater a valid password");
      return;
    }
    try {
      const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to register.");
      }
      console.log("Registered user ", data);

      setUserName("");
      setEmail("");
      setPassword("");

      router("/login");

      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form className="Register" onSubmit={handleRegister}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        placeholder="Enter your username"
        required
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn">
        <Link to="/login">Login Instead</Link>
      </button>
      <button type="submit" className="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
