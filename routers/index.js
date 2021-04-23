const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
router.get("/users", auth, getUsers);
router.patch("/user", auth, upload("imageFile"), updateUser);
router.delete("/user/:id", auth, deleteUser);

const { registrasi, login } = require("../controllers/authController");
router.post("/register", registrasi);
router.post("/login", login);

module.exports = router;
