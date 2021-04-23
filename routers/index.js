const express = require("express");

const router = express.Router();

const { registrasi, login } = require("../controllers/authController");
router.post("/register", registrasi);
router.post("/login", login);

module.exports = router;
