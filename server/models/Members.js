const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  numberOfBody: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  // Removed userId reference
});

module.exports = mongoose.model("Member", MemberSchema);
