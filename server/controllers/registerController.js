const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

const handleNewUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username || !email || !password) {
      throw AppError("Please User name email and password are required!", 400);
    }

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      throw AppError(
        "Please provide a valid email and password length should be atleast 8 chars",
        401,
      );
    }

    const duplicate = await userModel.findExistUser(email);

    if (duplicate) {
      throw AppError("Email already exists, choose another one.", 403);
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await userModel.createNewUser(username, email, hashedPwd);

    if (newUser) {
      return res.json({
        success: true,
        data: newUser,
        message: `New user ${username} has been successfully created!`,
      });
    } else {
      throw AppError("Failed to create a new user something went wrong", 403);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { handleNewUser };
