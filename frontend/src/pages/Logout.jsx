import React from "react";

const Logout = ({ handleLogout }) => {
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
