"use client";
import React, { useState, useEffect, useRef } from "react";
import Props from "prop-types";
import Separator from "./Separator";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import ErrorMessage from "./ErrorMessage";
import Modal from "./Modal";
import Button from "./Button";

const TransactionModal = ({ showBorrow, showPay, member, onClose }) => {
  if (!member) return null;
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [isGuarantorDisabled, setIsGuarantorDisabled] = useState(true);
  const [filteredGuarantor, setFilteredGuarantor] = useState([]);
  const [guarantorDropdownValue, setGuarantorDropdownValue] = useState("");
  const [showGuarantorDropdown, setShowGuarantorDropdown] = useState(false);
  const guarantorDropdownRef = useRef(null);
  const [selectedGuarantor, setSelectedGuarantor] = useState(null);

  const [amount, setAmount] = useState("");
  const [isAmountDisabled, setIsAmountDisabled] = useState(true);
  const [saveDisabled, setSaveDisabled] = useState(false);

  const [submissionData, setSubmissionData] = useState({});
  const dropdownRef = useRef(null);

  const [total, setTotal] = useState(0);

  // ?modals
  // const [modalType, setModalType] = useState(null);
  const [confirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [failedSave, setSaveFailed] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // ? error messages
  const [noMemberSelected, setIsNoMemberSelected] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [noGuarantor, setNoGurantorSelected] = useState(false);

  const [isMemberSelected, setIsMemberSelected] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isGuarantorValid, setIsGuarantorValid] = useState(false);

  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    const fetchTotalDepositAmount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/amount/totalDepositAmount"
        );
        setTotalAmount(response.data.overallTotalDepositAmount);
        console.log(totalAmount);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchTotalDepositAmount();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/members`); //! replace with new api
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setDropdownValue(member.name);
    setTotalDeposit(member.totalDeposit);
    setShowDropdown(false);
    setIsAmountDisabled(false);
    setIsMemberSelected(true);

    setFilteredGuarantor(members.filter((m) => m._id !== member._id));
    if (selectedGuarantor?._id === member._id) {
      setSelectedGuarantor(null);
      setGuarantorDropdownValue("");
    }
  };

  const handleDropdownClick = () => {
    if (dropdownValue === "") {
      setFilteredMembers(members);
    }
    setShowDropdown(true);
  };

  const handleInputBorrower = (e) => {
    const value = e.target.value;
    setDropdownValue(value);
    setShowDropdown(true);

    if (value.trim() === "") {
      resetForm();
    }

    const filtered = members.filter((member) =>
      member.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const validateAmount = (value) => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    let valid = true;

    if (numericValue > totalAmount) {
      setInvalidAmount(true);
      resetGuarantor();
      valid = false;
    } else {
      setInvalidAmount(false);
    }

    if (numericValue > totalDeposit) {
      setIsGuarantorDisabled(false);

      if (!selectedGuarantor) {
        setNoGurantorSelected(true);
        valid = false;
      } else {
        setNoGurantorSelected(false);
        setIsGuarantorDisabled(true);
      }
      setIsAmountValid(valid);
      return valid;
    }

    // setNoGurantorSelected(false);
    // setIsGuarantorDisabled(true);
    // return true;
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/,/g, "").trim();

    if (value === "" || isNaN(value)) {
      setAmount("");
      setInvalidAmount(false);
      resetGuarantor();
      return;
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setAmount(value);

    validateAmount(value);
  };

  const resetGuarantor = () => {
    setNoGurantorSelected(false);
    setIsGuarantorDisabled(true);
    setSelectedGuarantor(null);
    setGuarantorDropdownValue("");
  };

  useEffect(() => {
    if (selectedGuarantor) {
      setNoGurantorSelected(false);
    }
  }, [selectedGuarantor]);

  // ! put _ before id = _id
  const handleGuarantorClick = () => {
    if (guarantorDropdownValue === "") {
      setFilteredGuarantor(members.filter((m) => m.id !== selectedMember?.id));
    }
    setShowGuarantorDropdown(true);
  };

  const handleSelectGuarantor = (member) => {
    setSelectedGuarantor(member);
    setGuarantorDropdownValue(member.name);
    setShowGuarantorDropdown(false);
    setIsGuarantorValid(true);
  };

  const handleGuarantorInput = (e) => {
    const value = e.target.value;
    setGuarantorDropdownValue(value);
    setShowGuarantorDropdown(true);

    if (value === "") {
      setSaveDisabled(true);
      setSelectedGuarantor(null);
      setFilteredGuarantor(
        members.filter((m) => m._id !== selectedMember?._id)
      );
      setNoGurantorSelected(true);
    } else {
      const filtered = members.filter(
        (member) =>
          member._id !== selectedMember?._id &&
          member.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredGuarantor(filtered);

      if (filtered.length === 0 || selectedGuarantor) {
        setNoGurantorSelected(false);
      } else {
        setNoGurantorSelected(true);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        guarantorDropdownRef.current &&
        !guarantorDropdownRef.current.contains(event.target)
      ) {
        setShowGuarantorDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      isMemberSelected &&
      isAmountValid &&
      (isGuarantorDisabled || isGuarantorValid)
    ) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [isMemberSelected, isAmountValid, isGuarantorValid, isGuarantorDisabled]);

  // ! for saving
  const handleSave = async () => {
    setIsConfirmationModalVisible(true);

    const numericAmount = parseFloat(amount.replace(/,/g, ""));
    const submissionData = {
      borrowerId: selectedMember._id,
      borrowerName: selectedMember.name,
      borrowerDeposit: selectedMember.totalDeposit,
      guarantorId: selectedGuarantor?._id || null,
      guarantorName: selectedGuarantor?.name || null,
      amount: numericAmount,
      date: new Date().toISOString().split("T")[0], // Date in YYYY-MM-DD format
    };
    setSubmissionData(submissionData);
  };

  const handleConfirmSave = async () => {
    try {
      const response = await axios.post(
        //! change to loan API,
        "http://localhost:4000/loans",
        submissionData
      );

      console.log(submissionData);
      setSuccessModalVisible(true);
      setTimeout(() => {
        setSuccessModalVisible(false);
        resetForm();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error saving record:", error);
      setSaveFailed(true);
      setTimeout(() => {
        setSaveFailed(false);
      }, 2000);
    } finally {
      setIsConfirmationModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsConfirmationModalVisible(false);
    resetForm();
  };
  const resetForm = () => {
    setSelectedMember(null);
    setDropdownValue("");
    setTotalDeposit(0);
    setAmount("");
    setSelectedGuarantor(null);
    setGuarantorDropdownValue("");
    setIsAmountDisabled(true);
    setIsGuarantorDisabled(true);
    setNoGurantorSelected(false);
    // setSaveDisabled(true);
  };

  const handleCloseErrorModal = () => {
    setSaveFailed(false);
  };

  return (
    <>
      <div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 b-font w-full h-auto">
        <div className="bg-slate-50 p-8">
          <h1 className="text-2xl mb-10 font-bold">
            Total Amount: P <span>{totalAmount.toLocaleString()}</span>
          </h1>
          {showBorrow && (
            <>
              <div className="flex flex-col">
                <div className="flex justify-between space-x-14 mb-10 f-dash">
                  <div className="flex">
                    <p className="mr-4 text-2xl font-semibold">Borrower:</p>
                    <div className="relative w-45" ref={dropdownRef}>
                      <input
                        type="text"
                        value={dropdownValue}
                        onChange={handleInputBorrower}
                        onClick={handleDropdownClick}
                        className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
                        placeholder="Select a member..."
                        required
                      />
                      {showDropdown && (
                        <div className="absolute left-0 right-0 bg-white border-2 border-gray-800 rounded-md z-10 max-h-60 overflow-y-auto">
                          {filteredMembers.length > 0 ? (
                            filteredMembers.map((member) => (
                              <div
                                key={member._id}
                                className="text-xl cursor-pointer p-2 hover:bg-gray-200"
                                onClick={() => handleSelectMember(member)}
                              >
                                {member.name}
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-gray-500">
                              No matches found
                            </div>
                          )}
                        </div>
                      )}

                      {noMemberSelected && (
                        <ErrorMessage errorMessage={`No member is selected.`} />
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <p className="mr-4 text-2xl font-semibold">Amount:</p>
                    <div className="relative w-45">
                      <input
                        required
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
                        placeholder="Enter amount..."
                        disabled={isAmountDisabled}
                      />

                      {invalidAmount && (
                        <ErrorMessage
                          errorMessage={`Loan amount cannot be greater than ${totalAmount.toLocaleString()}`}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <p className="mr-4 text-2xl font-semibold">Guarantor:</p>
                    <div className="relative w-45" ref={guarantorDropdownRef}>
                      <input
                        type="text"
                        value={guarantorDropdownValue}
                        onChange={handleGuarantorInput}
                        onClick={handleGuarantorClick}
                        className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
                        placeholder="Select a guarantor..."
                        disabled={isGuarantorDisabled}
                      />
                      {showGuarantorDropdown && (
                        <div className="absolute left-0 right-0 bg-white border-2 border-gray-800 rounded-md z-10 max-h-60 overflow-y-auto">
                          {filteredGuarantor.length > 0 ? (
                            filteredGuarantor.map((member) => (
                              <div
                                key={member._id}
                                className="text-xl cursor-pointer p-2 hover:bg-gray-200"
                                onClick={() => handleSelectGuarantor(member)}
                              >
                                {member.name}
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-gray-500">
                              No matches found
                            </div>
                          )}
                        </div>
                      )}

                      {noGuarantor && (
                        <ErrorMessage errorMessage="No guarantor selected." />
                      )}
                    </div>
                  </div>
                </div>

                <Separator />
                <div className="b-font ">
                  <h3 className="text-2xl font-bold">Summary:</h3>
                  <div className="text-xl mt-3">
                    <p className="font-semibold">
                      Borrower:{" "}
                      <span className="ml-2">
                        {selectedMember ? selectedMember.name : ""}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Total Deposit:
                      <span className="ml-2">
                        {selectedMember
                          ? `P${selectedMember.totalDeposit.toLocaleString()}`
                          : ""}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Amount:
                      <span className="ml-2">{amount || "N/A"}</span>
                    </p>
                    <p className="font-semibold">
                      Guarantor:
                      <span className="ml-2">
                        {selectedGuarantor ? selectedGuarantor.name : "none"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {showPay && (
            <div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 b-font w-full h-auto">
              <div className="bg-slate-50 p-8 max-w-sm w-full">
                <h2 className="text-2xl mb-10 font-bold">
                  {showPay ? "Pay Loan" : "Borrow Loan"}
                </h2>
                <div className="mb-4">
                  <p className="mr-4 text-xl font-bold">
                    Borrower Name:{" "}
                    <span className="mr-4 text-xl font-semibold">
                      {member.borrowerName}
                    </span>
                  </p>
                  <p className="mr-4 text-xl font-bold">
                    Loan Amount:{" "}
                    <span className="mr-4 text-xl font-semibold">
                      {member.amount}
                    </span>
                  </p>
                  <p className="mr-4 text-xl font-bold">
                    Guarantor:{" "}
                    <span className="mr-4 text-xl font-semibold">
                      {member.guarantorName}
                    </span>
                  </p>
                  <p className="mr-4 text-xl font-bold text-red-500">
                    Balance:{" "}
                    <span className="mr-4 text-xl font-semibold text-red-500">
                      {member.balance}
                    </span>
                  </p>
                </div>
                {showPay && (
                  <>
                    <div className="mb-4">
                      <label className="mr-4 text-xl font-semibold">
                        Payment Amount
                      </label>
                      <input
                        type="number"
                        className="border-2 border-gray-400 rounded-md w-full text-xl p-1"
                        placeholder="Enter payment amount"
                      />
                    </div>
                  </>
                )}
                <div className="flex justify-end">
                  <Button onClick={onClose} className="mr-2" variant="warning">
                    Cancel
                  </Button>
                  <Button
                    // onClick={() => handleSubmitPayment(paymentAmount)}
                    className=""
                    variant="paid"
                  >
                    {showPay ? "Pay" : "Borrow"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            <Button variant="warning" onClick={onClose}>
              Close
            </Button>
            <button
              className="primary-button"
              onClick={handleSave}
              disabled={saveDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {confirmationModalVisible && (
        <ConfirmationModal
          message={"You are about to record the following information."}
          memberName={submissionData.borrowerName}
          amount={submissionData.amount}
          guarantor={submissionData.guarantorName}
          onCancel={handleCancel}
          onConfirm={handleConfirmSave}
        />
      )}
      {failedSave && <Modal message={"Error saving data."} />}
      {successModalVisible && <Modal message={"Record saved successfully"} />}
    </>
  );
};

export default TransactionModal;
