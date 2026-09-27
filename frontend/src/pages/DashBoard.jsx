import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../features/auth/authSlice";

const DashBoard = ({ error, isLoading }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="DashBoard">
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
      {isLoading && (
        <p style={{ marginTop: 100, textAlign: "center" }}>Loading...</p>
      )}
      {error && (
        <p style={{ marginTop: 100, color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <>
          <div className="Dashboard-header">
            <h2>{`Welcome, ${user.username} & ${user.email}`}</h2>
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
        </>
      )}
    </div>
  );
};

export default DashBoard;
