const Member = require("../models/Members");
const Loan = require("../models/Loan");
const TotalDeposits = require("../models/totalMemberDeposit");
const moment = require("moment-timezone");

exports.addLoan = async (req, res) => {
  const date = moment().tz("Asia/Manila").toDate();
  const { memberId, guarantorId, amount } = req.body;

  try {
    // Check if the member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // Check if the member already has a loan
    const existingLoan = await Loan.findOne({ memberId });
    if (existingLoan) {
      return res
        .status(400)
        .json({ msg: "Member already has an existing loan" });
    }

    // Check if the member has a total deposit record
    const totalDeposit = await TotalDeposits.findOne({ memberId });
    if (!totalDeposit) {
      return res.status(404).json({ msg: "Member Deposit not found" });
    }

    // Determine if a guarantor is required
    let guarantorName = null;
    if (amount > totalDeposit.totalAmount) {
      if (!guarantorId) {
        return res
          .status(400)
          .json({ msg: "Guarantor is required for this loan amount" });
      }

      const guarantor = await Member.findById(guarantorId);
      if (!guarantor) {
        return res.status(404).json({ msg: "Guarantor not found" });
      }
      guarantorName = guarantor.name;
    }

    let interestRate = amount * 0.05;

    // Create the new loan
    const memberLoan = new Loan({
      memberId,
      memberName: member.name,
      guarantorId: guarantorId || null,
      guarantorName: guarantorName || null,
      loanAmount: amount,
      interestRate,
      date,
    });

    // Save the loan
    await memberLoan.save();

    res.status(201).json({ msg: "Loan created successfully", memberLoan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getPossibleGuarantors = async (memberId, loanAmount) => {
  try {
    const member = await Member.findById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    const memberDeposit = await TotalDeposits.findOne({ memberId });
    if (!memberDeposit) {
      throw new Error("Member deposit not found");
    }

    const potentialGuarantors = await Member.find({ _id: { $ne: memberId } });
    const guarantorIds = potentialGuarantors.map((g) => g._id);

    // Bulk fetch all loans and deposits for the potential guarantors
    const loans = await Loan.find({ memberId: { $in: guarantorIds } });
    const deposits = await TotalDeposits.find({
      memberId: { $in: guarantorIds },
    });

    // Fetch all loans where the guarantor is already a guarantor
    const loansWhereGuarantor = await Loan.find({
      guarantorId: { $in: guarantorIds },
    });

    const validGuarantors = potentialGuarantors
      .filter((guarantor) => {
        const guarantorLoan = loans.find(
          (loan) => loan.memberId.toString() === guarantor._id.toString()
        );
        const guarantorDeposit = deposits.find(
          (deposit) => deposit.memberId.toString() === guarantor._id.toString()
        );

        const isAlreadyGuarantor = loansWhereGuarantor.some(
          (loan) => loan.guarantorId?.toString() === guarantor._id.toString()
        );

        if (guarantorDeposit && !isAlreadyGuarantor) {
          const totalLoan =
            (guarantorLoan?.loanAmount || 0) - (guarantorLoan?.amountPaid || 0);

          const remainingDeposit = guarantorDeposit.totalAmount - totalLoan;
          // const remainingDeposit =
          //   guarantorDeposit.totalAmount - (guarantorLoan?.loanAmount || 0);

          // Check if the guarantor can cover the requested loan amount
          return remainingDeposit >= loanAmount;
        }

        return false;
      })
      .map((guarantor) => ({
        id: guarantor._id,
        name: guarantor.name,
      }));
    return validGuarantors;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.memberValidity = async (req, res) => {
  const { memberId, loanAmount } = req.query;

  try {
    // Check if the member already has a loan
    const existingLoan = await Loan.findOne({ memberId });
    if (existingLoan) {
      return res
        .status(400)
        .json({ msg: "Member already has an existing loan." });
    }

    // Check if the member's deposit record exists
    const memberDeposit = await TotalDeposits.findOne({ memberId });
    if (!memberDeposit) {
      return res.status(404).json({ msg: "Member deposit not found." });
    }

    // Check if the member has acted as a guarantor
    const guarantorLoans = await Loan.find({ guarantorId: memberId });
    let totalGuaranteedAmount = 0;

    // Calculate total guaranteed amount by the member
    guarantorLoans.forEach((loan) => {
      totalGuaranteedAmount += loan.loanAmount;
    });

    // Calculate the remaining deposit after deducting guaranteed loans
    const remainingDeposit = memberDeposit.totalAmount - totalGuaranteedAmount;

    // Check if the remaining deposit is sufficient for the loan
    if (remainingDeposit < loanAmount) {
      const possibleGuarantors = await getPossibleGuarantors(
        memberId,
        loanAmount
      );

      if (possibleGuarantors.length === 0) {
        return res.status(400).json({ msg: "No valid guarantors found." });
      }

      return res.status(200).json({
        msg: "Member is not valid for the loan. Possible guarantors found.",
        possibleGuarantors,
      });
    }

    return res.status(200).json({ msg: "Member is valid to loan." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server errors" });
  }
};
