const Member = require("../models/Members");
const WeeklyDeposit = require("../models/weeklyDeposit");
const TotalDeposits = require("../models/totalMemberDeposit");
const moment = require("moment-timezone");

const getWeekOfYear = (date) => {
  return date.isoWeek();
};

// Function to get the start and end date of the ISO week in the correct timezone
const getWeekDateRange = (date) => {
  const startOfWeek = date
    .clone()
    .tz("Asia/Manila")
    .startOf("isoWeek")
    .add(1, "day")
    .startOf("day");
  const endOfWeek = date
    .clone()
    .tz("Asia/Manila")
    .endOf("isoWeek")
    .endOf("day");
  return { startDate: startOfWeek, endDate: endOfWeek };
};

exports.createDeposit = async (req, res) => {
  const { memberId, depositAmount, numberOfBody, selectedWeek } = req.body;

  try {
    // Find the member by ID
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // Calculate the week and year in the Philippines time zone
    const currentDate = moment().tz("Asia/Manila");
    const year = moment().tz("Asia/Manila").year();
    // const week = getWeekOfYear(currentDate); // Use getWeekOfYear to calculate the week
    const week = selectedWeek
      ? parseInt(selectedWeek)
      : getWeekOfYear(currentDate);
    const { startDate, endDate } = getWeekDateRange(currentDate);

    // Find or create the weekly deposit document
    let weeklyDeposit = await WeeklyDeposit.findOne({ year, week });
    if (!weeklyDeposit) {
      weeklyDeposit = new WeeklyDeposit({
        year,
        week,
        startDate,
        endDate,
        deposits: [],
      });
    }

    // Add the new deposit to the weekly deposits
    weeklyDeposit.deposits.push({
      memberId: member._id,
      memberName: member.name,
      numberOfBody,
      depositAmount,
      date: currentDate.toDate(), // Store as Date type
    });
    await TotalDeposits.updateOne(
      { memberId },
      {
        $inc: { totalAmount: depositAmount },
        $set: { memberName: member.name }, // Update or set the memberName
        $set: { year: year },
      },
      { upsert: true }
    );

    // Save the weekly deposit document
    await weeklyDeposit.save();

    res
      .status(201)
      .json({ msg: "Deposit created successfully", weeklyDeposit });
  } catch (err) {
    console.error("Error creating deposit:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getMembersWithoutDeposit = async (req, res) => {
  try {
    const { selectedWeek } = req.query; // Get the selected week from query parameters
    const currentDate = moment().tz("Asia/Manila");
    const year = currentDate.year();
    const week = selectedWeek
      ? parseInt(selectedWeek)
      : getWeekOfYear(currentDate); // Use selected week or current week

    // Fetch the weekly deposits for the specified week
    const weeklyDeposit = await WeeklyDeposit.findOne({ year, week });

    // If there are no deposits for the specified week, all members are without deposits
    if (!weeklyDeposit) {
      const members = await Member.find();
      return res.status(200).json(members);
    }

    // Get the list of member IDs who made deposits
    const membersWithDeposits = weeklyDeposit.deposits.map((deposit) =>
      deposit.memberId.toString()
    );

    // Fetch members who haven't made a deposit in the specified week
    const membersWithoutDeposits = await Member.find({
      _id: { $nin: membersWithDeposits },
    });

    res.status(200).json(membersWithoutDeposits);
  } catch (err) {
    console.error("Error fetching members without deposits:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// used to update the totaldeposit model in mongodb
// const calculateTotals = async () => {
//   const totals = await WeeklyDeposit.aggregate([
//     {
//       $unwind: "$deposits", // Unwind the deposits array
//     },
//     {
//       $group: {
//         _id: {
//           memberId: "$deposits.memberId",
//           year: "$year", // Group by year as well
//         },
//         totalAmount: { $sum: "$deposits.depositAmount" },
//         memberName: { $first: "$deposits.memberName" }, // Use $first to get the memberName
//       },
//     },
//     {
//       $project: {
//         memberId: "$_id.memberId",
//         year: "$_id.year",
//         memberName: 1,
//         totalAmount: 1,
//       },
//     },
//   ]);

//   return totals;
// };

// const updateTotalDeposits = async () => {
//   const totals = await calculateTotals();

//   const bulkOps = totals.map((total) => ({
//     updateOne: {
//       filter: { memberId: total.memberId, year: total.year },
//       update: {
//         $set: {
//           memberName: total.memberName,
//           totalAmount: total.totalAmount,
//           year: total.year,
//         },
//       },
//       upsert: true,
//     },
//   }));

//   await TotalDeposits.bulkWrite(bulkOps);

//   console.log("Total deposits have been updated..");
// };

// updateTotalDeposits().catch(console.error);
