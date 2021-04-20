const express = require("express");

const router = express.Router();

const { getUsers, deleteUser } = require("../controllers/UserController");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

module.exports = router;
