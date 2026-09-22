const ROLES = require("../config/roles_list");
const userModel = require("../models/usersModel");
const roleModel = require("../models/rolesModel");

const handleRoles = async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  const validRole = Object.values(ROLES).includes(Number(roleId));

  if (!validRole) {
    return res.status(404).json({ message: "Invalid role" });
  }

  const user = await userModel.findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: "No. user has been found!" });
  }

  await roleModel.addRoles(userId, Number(roleId));
  res.status(201).json({
    message: "Role Assigned Successfully!",
  });
};

module.exports = { handleRoles };
