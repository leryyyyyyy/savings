const moment = require("moment-timezone");
const WeeklyDeposit = require("../models/weeklyDeposit");
const Member = require("../models/Members");
const TotalDeposits = require("../models/totalMemberDeposit");

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

    // Fetch the total deposit amount directly from the TotalDeposit collection
    const totalDepositRecord = await TotalDeposits.findOne({
      memberId: memberId,
      year: currentYear,
    });

    // Handle the case where no record is found
    const totalAmount = totalDepositRecord ? totalDepositRecord.totalAmount : 0;
    const memberName = totalDepositRecord
      ? totalDepositRecord.memberName
      : "Unknown Member";

    res.status(200).json({
      memberId,
      memberName,
      year: currentYear,
      totalAmount,
    });
  } catch (err) {
    console.error(
      "Error fetching total deposit amount for member:",
      err.message
    );
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
