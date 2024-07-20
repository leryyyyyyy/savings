// // models/Deposit.js
// const mongoose = require("mongoose");

// const DepositSchema = new mongoose.Schema({
//   memberId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Member",
//     required: true,
//   },
//   memberName: {
//     type: String,
//     required: true,
//   },
//   depositAmount: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   weekOfMonth: {
//     type: Number,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Deposit", DepositSchema);

// models/WeeklyDeposit.js
const mongoose = require("mongoose");

const WeeklyDepositSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  week: {
    type: Number,
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
    },
  ],
});

module.exports = mongoose.model("WeeklyDeposit", WeeklyDepositSchema);
