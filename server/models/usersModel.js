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

const createNewUser = async (username, email, password, createdAt) => {
  const [newUser] = await pool.query(
    "INSERT INTO users(username, email, password, createdAt)VALUES(?,?,?, ?)",
    [username, email, password, createdAt],
  );
  return {
    id: newUser.insertId,
    username,
    email,
    createdAt,
  };
};

const findUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, email, username FROM users WHERE id = ? ",
    [id],
  );
  return rows[0];
};

module.exports = { findExistUser, findAllUsers, createNewUser, findUserById };
