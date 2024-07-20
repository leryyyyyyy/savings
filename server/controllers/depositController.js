const Member = require("../models/Members");
const WeeklyDeposit = require("../models/weeklyDeposit");

const moment = require("moment-timezone");

// const getWeekOfMonth = (date) => {
//   const startOfMonth = moment(date).startOf("month");
//   const startDay = startOfMonth.day(); // Day of the week the month starts on
//   const adjustedDate = date.date() + startDay; // Adjust the date to account for the start day
//   return Math.ceil(adjustedDate / 7);
// };
// exports.createDeposit = async (req, res) => {
//   const { memberId, depositAmount } = req.body;

//   try {
//     // Find the member by ID
//     const member = await Member.findById(memberId);
//     if (!member) {
//       return res.status(404).json({ msg: "Member not found" });
//     }

//     // Calculate the week of the month in the Philippines time zone
//     const currentDate = moment().tz("Asia/Manila");
//     const weekOfMonth = getWeekOfMonth(currentDate);
//     const readableDate = moment(currentDate)
//       .tz("Asia/Manila")
//       .format("YYYY/MM/DD HH:mm:ss");
//     console.log(readableDate);
//     // Create a new deposit
//     const newDeposit = new Deposit({
//       memberId: member._id,
//       memberName: member.name,
//       depositAmount,
//       date: currentDate.toDate(),
//       weekOfMonth,
//     });

//     // Save the deposit to the database
//     await newDeposit.save();

//     res.status(201).json({
//       msg: "Deposit created successfully",
//       deposit: newDeposit,
//       readableTime: readableDate,
//     });
//   } catch (err) {
//     console.error("Error creating deposit:", err.message);
//     res.status(500).send("Server error");
//   }
// };

const getWeekOfMonth = (date) => {
  const startOfMonth = moment(date).startOf("month");
  const startDay = startOfMonth.day(); // Day of the week the month starts on
  const adjustedDate = date.date() + startDay; // Adjust the date to account for the start day
  return Math.ceil(adjustedDate / 7);
};

exports.createDeposit = async (req, res) => {
  const { memberId, depositAmount } = req.body;

  try {
    // Find the member by ID
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // Calculate the week and month in the Philippines time zone
    const currentDate = moment().tz("Asia/Manila");
    const year = currentDate.year();
    const month = currentDate.month() + 1; // month() returns 0-11, so add 1
    const week = getWeekOfMonth(currentDate); // Use getWeekOfMonth to calculate the week
    const day = currentDate.date();

    // Find or create the weekly deposit document
    let weeklyDeposit = await WeeklyDeposit.findOne({ year, month, week });
    if (!weeklyDeposit) {
      weeklyDeposit = new WeeklyDeposit({
        year,
        month,
        week,
        deposits: [],
        day,
      });
    }

    // Add the new deposit to the weekly deposits
    weeklyDeposit.deposits.push({
      memberId: member._id,
      memberName: member.name,
      depositAmount,
      day,
    });

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
    // Fetch all members
    const members = await Member.find();

    // Calculate the current week in the Philippines time zone
    const currentDate = moment().tz("Asia/Manila");
    const year = currentDate.year();
    const month = currentDate.month() + 1; // month() returns 0-11, so add 1
    const week = getWeekOfMonth(currentDate); // Use getWeekOfMonth to calculate the week

    // Fetch the weekly deposits for the current week
    const weeklyDeposit = await WeeklyDeposit.findOne({ year, month, week });

    // If there are no deposits for the current week, all members are without deposits
    if (!weeklyDeposit) {
      return res.status(200).json(members);
    }

    // Get the list of member IDs who made deposits
    const membersWithDeposits = weeklyDeposit.deposits.map((deposit) =>
      deposit.memberId.toString()
    );

    // Filter out the members who didn't make a deposit
    const membersWithoutDeposits = members.filter(
      (member) => !membersWithDeposits.includes(member._id.toString())
    );

    res.status(200).json(membersWithoutDeposits);
  } catch (err) {
    console.error("Error fetching members without deposits:", err.message);
    res.status(500).send("Server error");
  }
};
