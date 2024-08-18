const express = require("express");
const { addMember, getAllMembers } = require("../controllers/authController");
const {
  editMember,
  getMemberById,
  softDeleteMember,
  editMemeberAddDelete,
} = require("../controllers/editMemberController");
const router = express.Router();

// Route to add a member
router.post("/add", addMember);
router.get("/memberList", getAllMembers);
router.put("/editMember/:id", editMember);
router.get("/member/:id", getMemberById);
router.get("/deleteMember/:id", softDeleteMember);
module.exports = router;
