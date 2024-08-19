const User = require("../models/User");
const Member = require("../models/Members");

exports.editMember = async (req, res) => {
  const { id } = req.params;
  const { name, contactNumber, address, numberOfBody } = req.body;

  try {
    // Find the member by ID and update their information
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { name, contactNumber, address, numberOfBody },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ msg: "Member not found" });
    }

    res
      .status(200)
      .json({ msg: "Member updated successfully", member: updatedMember });
  } catch (err) {
    console.error("Error updating member:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.status(200).json(member);
  } catch (err) {
    console.error("Error fetching member:", err.message);
    res.status(500).send("Server error");
  }
};

exports.softDeleteMember = async (req, res) => {
  try {
    const result = await Member.updateOne(
      { _id: req.params.id },
      { $set: { isDeleted: true, deletedAt: new Date() } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ msg: "Member not found" });
    }
    res.status(200).json({ msg: "Member marked as deleted successfully" });
  } catch (err) {
    console.error("Error soft deleting member:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// exports.editMemeberAddDelete = async (req, res) => {
//   try {
//     const result = await Member.updateMany(
//       { isDeleted: { $exists: false } },
//       { $set: { isDeleted: false, deletedAt: null } }
//     );
//     console.log(`Matched ${result.matchedCount} documents`);
//     console.log(`Modified ${result.modifiedCount} documents`);
//     res.status(200).json({ msg: "update yehey" });
//   } catch (err) {}
// };
