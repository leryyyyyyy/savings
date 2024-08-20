const mongoose = require("mongoose");

const totalDepositsSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  memberName: { type: String, required: true },
  year: { type: Number, required: true, default: 0 },
  totalAmount: { type: Number, default: 0 },
});

const TotalDeposits = mongoose.model("TotalDeposits", totalDepositsSchema);
module.exports = TotalDeposits;
