const Member = require("../models/Members");
const { findById } = require("../models/weeklyDeposit");

exports.addLoan = async (req, res) => {
  const { memberId, memberName, guarantorId, guarantorName, amount, date } =
    req.body;

  try {
    const member = await Member.findById(memberId);
    if (!memberId) {
      return res.status(404).json({ msg: "Member not found" });
    }
  } catch (err) {}
};
