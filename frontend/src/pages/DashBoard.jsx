import React from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="DashBoard">
      <div className="Dashboard-header">
        <h2>Welcome, {user.email}</h2>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="cards-container">
        <div className="card">
          <h3>Total Staff</h3>
          <h6>Selling team</h6>
          <p>50</p>
        </div>

        <div className="card">
          <h3>Active</h3>
          <p>40</p>
        </div>

        <div className="card">
          <h3>On Leave</h3>
          <p>10</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
