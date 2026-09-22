const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const ROLES = require("../config/roles_list");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyRoles = require("../middlewares/verifyRoles");

router
  .route("/")
  .get(verifyJWT, booksController.findAllBooks)
  .post(verifyJWT, booksController.createBook);

router
  .route("/:id")
  .put(verifyJWT, booksController.updateBook)
  .delete(verifyJWT, verifyRoles(ROLES.Admin), booksController.deleteBook)
  .get(verifyJWT, booksController.findOneBook);

module.exports = router;
