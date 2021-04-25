const express = require("express");

const router = express.Router();

const { auth } = require("../middleware/auth");
const { uploadImg } = require("../middleware/uploadImg");

const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
router.get("/users", getUsers);
router.patch("/user/:id", uploadImg("avatar"), auth, updateUser);
router.delete("/user/:id", deleteUser);

const {
  getFunds,
  getFundsDetail,
  createFund,
  updateFund,
  deleteFund,
  updateUsersDonate,
} = require("../controllers/fundController");
router.get("/funds", getFunds);
router.get("/fund/:id", getFundsDetail);
router.post("/fund", auth, uploadImg("thumbnail"), createFund);
router.patch("/fund/:id", auth, uploadImg("thumbnail"), updateFund);
router.delete("/fund/:id", auth, deleteFund);
router.patch("/fund/:fundid/:userid", auth, updateUsersDonate);

const { registrasi, login } = require("../controllers/authController");
router.post("/register", registrasi);
router.post("/login", login);

module.exports = router;
