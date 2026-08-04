const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyJWT = require("../middlewares/verifyJWT");

router.route("/").post(authController.handleLogin);
router.route("/user").get(verifyJWT, authController.handleCurrentUser);

module.exports = router;
