const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const Jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !password) {
      throw AppError("User email and password are required!", 400);
    }

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      throw AppError("Invalid email or password format.", 400);
    }

    const foundUser = await userModel.findExistUser(email);

    if (!foundUser) {
      throw AppError("Invalid email or password.", 401);
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      throw AppError("Invalid email or password.", 401);
    }

    const token = Jwt.sign(
      {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.ACCESS_SECRET_TOKEN,
      {
        expiresIn: "30m",
      },
    );
    if (token) {
      return res.status(200).json({
        success: true,
        message: `User ${foundUser.username} has successfully logged in!`,
        accessToken: token,
      });
    } else {
      throw AppError("Filed to login please try again", 401);
    }
  } catch (err) {
    next(err);
  }
};

const handleCurrentUser = (req, res) => {
  res.json({
    email: req.user.email,
  });
};

module.exports = {
  handleLogin,
  handleCurrentUser,
};
