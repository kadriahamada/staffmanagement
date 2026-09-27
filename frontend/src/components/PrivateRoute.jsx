import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${URL}/auth/user`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Authentication check failed: ", err);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // We don't know yet
  if (isAuthenticated === null) {
    return <p>Checking Authentication...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
