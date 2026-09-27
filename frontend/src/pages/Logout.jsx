import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../features/auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3500/logout", {
      method: "POST",
      credentials: "include",
    });
    dispatch(logout());
    router("/login");
  };

  return (
    <main className="Logout">
      <p>
        Thus, Attention this page is specifically for login out marq you when
        you log out you will have to login again if you want to access to the
        application
      </p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
};

export default Logout;
