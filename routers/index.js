const express = require("express");

const router = express.Router();

const { getUsers, deleteUser } = require("../controllers/UserController");

router.get("/user", getUsers);
router.delete("/user/:id", deleteUser);

module.exports = router;
