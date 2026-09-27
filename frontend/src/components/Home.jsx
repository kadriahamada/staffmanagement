import React from "react";

import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <main className="Home">
      <p>
        Its an application basically prompted or planned for teaching purposes
        welcome!
      </p>
      <h2 style={{ textAlign: "center", marginTop: 30, color: "blueviolet" }}>
        {user ? `Welcome: ${user.email}` : "Please Login."}
      </h2>
    </main>
  );
};

export default Home;
