const userModel = require("../models/usersModel");
const roleModel = require("../models/rolesModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const ROLES = require("../config/roles_list");

const { format } = require("date-fns");

const handleNewUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    // Check required fields
    if (!username || !email || !password) {
      throw AppError("Please username, email and password are required!", 400);
    }

    // Validate email and password
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      throw AppError(
        "Please provide a valid email and password must be at least 8 characters",
        400,
      );
    }

    // Check if email already exists
    const duplicate = await userModel.findExistUser(email);

    if (duplicate) {
      throw AppError("Email already exists, choose another one.", 403);
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    const createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    // 1. Create the user first
    const newUser = await userModel.createNewUser(
      username,
      email,
      hashedPwd,
      createdAt,
    );

    // Check if user was created
    if (!newUser) {
      throw AppError("Failed to create a new user. Something went wrong.", 500);
    }

    // 2. Give the new user the basic User role
    // ROLES.User = 1234
    await roleModel.addRoles(newUser.id, ROLES.User);

    // 3. Send success response
    return res.status(201).json({
      success: true,
      data: newUser,
      message: `New user ${username} has been successfully created!`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { handleNewUser };
