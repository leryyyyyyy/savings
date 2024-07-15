const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  getAllUsers,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user", getUser); // Add this line
router.get("/getUsers", getAllUsers);

module.exports = router;
