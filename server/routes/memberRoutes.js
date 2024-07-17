const express = require("express");
const { addMember } = require("../controllers/authController");
const router = express.Router();

// Route to add a member
router.post("/add", addMember);

module.exports = router;
