const express = require("express");
const router = express.Router();
const {
  getOverallTotalDeposit,
  getTotalMemberDeposit,
} = require("../controllers/totalAmountController");

router.get("/totalDepositAmount", getOverallTotalDeposit);
router.get("/memberTotalDepositAmount/:id", getTotalMemberDeposit);
module.exports = router;
