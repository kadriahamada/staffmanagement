const Jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token has been provided!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "null") {
    return res.status(401).json({ message: "Ooops!, Token is missing.." });
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
};

module.exports = verifyJWT;
