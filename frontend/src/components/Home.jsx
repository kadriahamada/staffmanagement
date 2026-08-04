import React from "react";

const Home = ({ user }) => {
  return (
    <main className="Home">
      <p>
        Its an application basically prompted or planned for teaching purposes
        welcome!
      </p>
      <h2 style={{ textAlign: "center", marginTop: 30, color: "blueviolet" }}>
        {user.email}
      </h2>
    </main>
  );
};

export default Home;
