// Express router for user-related endpoints
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

// Register a new user
router.post("/register", userController.register);
// Login a user
router.post("/login", userController.login);

module.exports = router;
