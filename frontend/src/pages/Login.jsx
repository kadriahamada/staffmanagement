import React from "react";
import { Link } from "react-router-dom";

const Login = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <form className="Login" onSubmit={handleLogin}>
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
        <Link to="/register">Register Instead</Link>
      </button>
      <button type="submit" className="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
