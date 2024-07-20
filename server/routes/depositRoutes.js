const express = require("express");
const router = express.Router();
const {
  createDeposit,
  getMembersWithoutDeposit,
} = require("../controllers/depositController");

router.post("/addDeposit", createDeposit);
router.get("/depositList", getMembersWithoutDeposit);

module.exports = router;
