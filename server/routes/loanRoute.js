const express = require("express");
const router = express.Router();

const {
  addLoan,
  // getPossibleGuarantors,
  memberValidity,
} = require("../controllers/loanController");

router.post("/addLoan", addLoan);
// router.get("/possibleGuarantors", getPossibleGuarantors);
router.get("/memberValidity", memberValidity);
module.exports = router;
