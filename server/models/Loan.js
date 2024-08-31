const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  memberName: {
    type: String,
    required: true,
  },
  guarantorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    default: null,
  },
  guarantorName: {
    type: String,
    default: null,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("Loan", LoanSchema);
