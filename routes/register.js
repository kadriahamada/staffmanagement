const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const verifyJWT = require("../middlewares/verifyJWT");

router.route("/").post(registerController.handleNewUser);

module.exports = router;
