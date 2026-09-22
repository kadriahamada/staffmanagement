const Jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const verifyJWT = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw AppError("Authentication is required.", 401);
    }

    Jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token, provide the right token.",
        });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyJWT;
