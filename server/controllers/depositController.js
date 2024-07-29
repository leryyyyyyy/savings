const Member = require("../models/Members");
const WeeklyDeposit = require("../models/weeklyDeposit");

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
  const { memberId, depositAmount, numberOfBody } = req.body;

  try {
    // Find the member by ID
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // Calculate the week and year in the Philippines time zone
    const currentDate = moment().tz("Asia/Manila");
    const year = moment().tz("Asia/Manila").year();
    const week = getWeekOfYear(currentDate); // Use getWeekOfYear to calculate the week
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
    // Calculate the current week in the Philippines time zone
    const currentDate = moment().tz("Asia/Manila");
    const year = currentDate.year();
    const week = getWeekOfYear(currentDate); // Use getWeekOfYear to calculate the week

    // Fetch the weekly deposits for the current week
    const weeklyDeposit = await WeeklyDeposit.findOne({ year, week });

    // If there are no deposits for the current week, all members are without deposits
    if (!weeklyDeposit) {
      const members = await Member.find();
      return res.status(200).json(members);
    }

    // Get the list of member IDs who made deposits
    const membersWithDeposits = weeklyDeposit.deposits.map((deposit) =>
      deposit.memberId.toString()
    );

    // Fetch members who haven't made a deposit in the current week
    const membersWithoutDeposits = await Member.find({
      _id: { $nin: membersWithDeposits },
    });

    res.status(200).json(membersWithoutDeposits);
  } catch (err) {
    console.error("Error fetching members without deposits:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
