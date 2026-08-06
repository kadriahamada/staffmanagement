import React from "react";
import { Link } from "react-router-dom";
const Register = ({
  username,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  handleRegister,
}) => {
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
