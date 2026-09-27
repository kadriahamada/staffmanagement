import React from "react";
import { Link } from "react-router";

const Nav = () => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <nav className="Nav">
      <form className="">
        <label htmlFor="search">Search</label>
        <input type="text" placeholder="Search for a staff member" />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {!accessToken ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
