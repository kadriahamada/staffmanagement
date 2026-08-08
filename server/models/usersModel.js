const pool = require("../config/db");

const findExistUser = async (email) => {
  const [isUser] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return isUser[0];
};

const findAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

const createNewUser = async (username, email, password) => {
  const [newUser] = await pool.query(
    "INSERT INTO users(username, email, password)VALUES(?,?,?)",
    [username, email, password],
  );
  return newUser;
};

module.exports = { findExistUser, findAllUsers, createNewUser };
