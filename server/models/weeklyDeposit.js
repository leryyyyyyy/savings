// models/WeeklyDeposit.js
const mongoose = require("mongoose");

const WeeklyDepositSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  deposits: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
      },
      memberName: {
        type: String,
        required: true,
      },
      depositAmount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("WeeklyDeposit", WeeklyDepositSchema);
