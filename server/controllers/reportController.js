const moment = require("moment-timezone");
const Member = require("../models/Members");
const WeeklyDeposit = require("../models/weeklyDeposit");

const getWeekOfYear = (date) => {
  return date.isoWeek();
};

const getWeekDateRange = (date) => {
  const startOfWeek = date
    .clone()
    .tz("Asia/Manila")
    .startOf("isoWeek")
    .startOf("day");
  const endOfWeek = date
    .clone()
    .tz("Asia/Manila")
    .endOf("isoWeek")
    .endOf("day");
  return { startDate: startOfWeek, endDate: endOfWeek };
};

exports.getWeeklyData = async (req, res) => {
  try {
    const members = await Member.find();
    const currentYear = moment().tz("Asia/Manila").year();
    const weeklyData = [];

    for (let week = 1; week <= 52; week++) {
      const deposits = await WeeklyDeposit.find({ year: currentYear, week });
      const membersWithDeposits = deposits.flatMap((deposit) =>
        deposit.deposits.map((d) => ({
          memberId: d.memberId.toString(),
          memberName: d.memberName,
          depositAmount: d.depositAmount,
          numberOfBody: d.numberOfBody, // Include numberOfBody
          date: moment(d.date)
            .tz("Asia/Manila")
            .format("MMMM Do YYYY, h:mm:ss a"), // Format date to 12-hour format
        }))
      );
      const membersWithDepositsIds = membersWithDeposits.map((d) => d.memberId);
      const membersWithoutDeposits = members.filter(
        (member) => !membersWithDepositsIds.includes(member._id.toString())
      );

      const { startDate, endDate } = getWeekDateRange(
        moment().year(currentYear).isoWeek(week)
      );

      const totalDepositAmount = membersWithDeposits.reduce(
        (total, deposit) => total + deposit.depositAmount,
        0
      );

      weeklyData.push({
        year: currentYear,
        week,
        startDate: moment(startDate).tz("Asia/Manila").format("MMMM Do YYYY"), // Format start date
        endDate: moment(endDate).tz("Asia/Manila").format("MMMM Do YYYY"), // Format end date
        totalDepositAmount,
        membersWithDepositsCount: membersWithDeposits.length,
        membersWithoutDepositsCount: membersWithoutDeposits.length,
        membersWithDeposits,
        membersWithoutDeposits,
      });
    }

    res.status(200).json(weeklyData);
  } catch (err) {
    console.error("Error fetching weekly data:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
