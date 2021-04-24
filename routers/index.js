const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

const { getUsers, deleteUser } = require("../controllers/UserController");
router.get("/users", auth, getUsers);
router.delete("/user/:id", auth, deleteUser);

const {
  getFunds,
  getFundsDetail,
  createFund,
  updateFund,
  updateUsersDonate,
  deleteFund,
} = require("../controllers/fundController");
router.get("/funds", auth, getFunds);
router.get("/fund/:id", auth, upload("imageFile"), getFundsDetail);
router.post("/fund", auth, createFund);
router.patch("/fund/:id", auth, updateFund);
router.delete("/fund/:id", auth, deleteFund);

const { registrasi, login } = require("../controllers/authController");
router.post("/register", registrasi);
router.post("/login", login);

module.exports = router;
