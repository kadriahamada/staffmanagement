const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const Jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!email || !password) {
    return res.status(400).json("Please User email and password are required!");
  }

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    return res
      .status(404)
      .json(
        "Please provide a valid email and password length should be atleast 8 chars",
      );
  }

  const foundUser = await userModel.findExistUser(email);

  if (!foundUser) {
    return res.status(403).json({ message: "Email does not exist." });
  }

  try {
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json("Incorrect password, Verify your password.");
    }

    const token = Jwt.sign(
      {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "10m" },
    );
    return res.json({
      success: true,
      message: `User ${foundUser.username} has successfully logged In!`,
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json({ message: `Failed to login: ${err.message}` });
  }
};

const handleCurrentUser = (req, res) => {
  res.json({
    email: req.user.email,
  });
};

module.exports = { handleLogin, handleCurrentUser };
