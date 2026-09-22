const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");
const Jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    // Validate input
    if (!email || !password) {
      throw AppError("User email and password are required!", 400);
    }

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      throw AppError("Invalid email or password.", 400);
    }

    // Find user
    const foundUser = await userModel.findExistUser(email);

    if (!foundUser) {
      throw AppError("User email does not exist.", 401);
    }

    // Compare password
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      throw AppError(
        "Password does not match, provide the right password.",
        401,
      );
    }

    // Create JWT
    const token = Jwt.sign(
      {
        id: foundUser.id,
      },
      process.env.ACCESS_SECRET_TOKEN,
      {
        expiresIn: "30m",
      },
    );

    // Store JWT in HttpOnly cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: `User ${foundUser.username} has successfully logged in!`,
    });
  } catch (err) {
    next(err);
  }
};

const handleCurrentUser = async (req, res, next) => {
  try {
    const user = await userModel.findUserById(req.user.id);

    if (!user) {
      throw AppError("User has not been found.", 404);
    }

    return res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleLogin,
  handleCurrentUser,
};
