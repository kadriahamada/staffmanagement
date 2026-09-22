const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesController");
const ROLES = require("../config/roles_list");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyRoles = require("../middlewares/verifyRoles");

router
  .route("/:userId")
  .post(verifyJWT, verifyRoles(ROLES.Admin), rolesController.handleRoles);

module.exports = router;
