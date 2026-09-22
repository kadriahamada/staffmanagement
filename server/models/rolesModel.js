const pool = require("../config/db");
const addRoles = async (userId, roleId) => {
  try {
    const [rows] = await pool.query(
      "INSERT INTO usersrole(userId, roleId) VALUES(? , ?)",
      [userId, roleId],
    );

    return rows;
  } catch (error) {
    if (error.code === "Error DUPLICATE ENTRY") {
      throw new Error("Please user already has this role.");
    }
    throw error;
  }
};

module.exports = { addRoles };
