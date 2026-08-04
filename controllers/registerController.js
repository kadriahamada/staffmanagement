const userModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json("Please User name email and password are required!");
  }

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    return res
      .status(404)
      .json(
        "Please provide a valid email and password length should be atleast 8 chars",
      );
  }

  const duplicate = await userModel.findExistUser(email);

  if (duplicate) {
    return res
      .status(403)
      .json({ message: "Email already exists, choose another one." });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  try {
    const newUser = await userModel.createNewUser(username, email, hashedPwd);

    return res.json({
      success: true,
      data: newUser,
      message: `New user ${username} has been successfully created!`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Failed to create user: ${err.message}` });
  }
};

module.exports = { handleNewUser };
