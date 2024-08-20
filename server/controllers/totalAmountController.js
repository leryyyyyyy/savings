const moment = require("moment-timezone");
const WeeklyDeposit = require("../models/weeklyDeposit");
const Member = require("../models/Members");

exports.getOverallTotalDeposit = async (req, res) => {
  try {
    const currentYear = moment().tz("Asia/Manila").year();
    let overallTotalDepositAmount = 0;
    const allWeeklyDeposits = await WeeklyDeposit.find({ year: currentYear });

    overallTotalDepositAmount = allWeeklyDeposits.reduce((total, week) => {
      const weeklyTotal = week.deposits.reduce(
        (sum, deposit) => sum + deposit.depositAmount,
        0
      );
      return total + weeklyTotal;
    }, 0);

    res.status(200).json({ year: currentYear, overallTotalDepositAmount });
  } catch (err) {
    console.error("Error fetching overall total deposit amount:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.getTotalMemberDeposit = async (req, res) => {
  try {
    const memberId = req.params.id;
    const currentYear = moment().tz("Asia/Manila").year();
    const memberDeposits = await WeeklyDeposit.find({
      year: currentYear,
      "deposits.memberId": memberId,
    });

    const totalDepositAmount = memberDeposits.reduce((total, week) => {
      const weeklyTotal = week.deposits
        .filter((deposit) => deposit.memberId.toString() === memberId)
        .reduce((sum, deposit) => sum + deposit.depositAmount, 0);
      return total + weeklyTotal;
    }, 0);

    const memberName =
      memberDeposits[0]?.deposits.find(
        (deposit) => deposit.memberId.toString() === memberId
      )?.memberName || "Unknown Member";

    res.status(200).json({
      memberId,
      memberName,
      year: currentYear,
      totalDepositAmount,
    });
  } catch (err) {
    console.error(
      "Error fetching total deposit amount for member:",
      err.message
    );
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
