const express = require("express");
const { addMember, getAllMembers } = require("../controllers/authController");
const router = express.Router();

// Route to add a member
router.post("/add", addMember);
router.get("/memberList", getAllMembers);

module.exports = router;
