"use client";
import React, { useState, useEffect, useRef } from "react";
import Separator from "./Separator";
import axios from "axios";

const TransactionModal = ({ showBorrow, showPay, onClose }) => {
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
	const [errorMessage, setErrorMessage] = useState(false);

	const [submissionData, setSubmissionData] = useState({});
	const dropdownRef = useRef(null);

	const [total, setTotal] = useState(0);

	const [modalType, setModalType] = useState(null);

	useEffect(() => {
		const fetchTotalDepositAmount = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/amount/totalDepositAmount`
				);
				setTotal(response.data.overallTotalDepositAmount);
				console.log(total);
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

	useEffect(() => {
		const fetchTotalDepositAmount = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/amount/totalDepositAmount`
				);
				setTotalAmount(response.data.overallTotalDepositAmount);
				console.log(totalAmount);
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};

		fetchTotalDepositAmount();
	}, []);
	const handleSelectMember = (member) => {
		setSelectedMember(member);
		setDropdownValue(member.name);
		setTotalDeposit(member.totalDeposit);
		setShowDropdown(false);
		setIsAmountDisabled(false); //? */ Enable amount input when a member is selected

		// ! after testing uncomment setFilteredGuarantor(members.filter((m) => m._id !== member._id));
		setFilteredGuarantor(members.filter((m) => m.id !== member.id));
		if (selectedGuarantor?.id === member.id) {
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
			setSelectedMember(null);
			setAmount(""); // Clear amount value
			setIsAmountDisabled(true); // Disable amount input when no member is selected
			setSelectedGuarantor(null);
			setIsGuarantorDisabled(true);
			setGuarantorDropdownValue("");
		}

		const filtered = members.filter((member) =>
			member.name.toLowerCase().startsWith(value.toLowerCase())
		);
		setFilteredMembers(filtered);
	};

	const handleAmountChange = (e) => {
		let value = e.target.value.replace(/,/g, "").trim();

		if (value === "" || isNaN(value)) {
			setAmount("");
			setErrorMessage(false);
			resetGuarantor();
			return;
		}

		value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		setAmount(value);

		const numericValue = parseFloat(value.replace(/,/g, ""));

		if (numericValue > totalAmount) {
			setErrorMessage(true);
			resetGuarantor();
		} else {
			setErrorMessage(false);

			if (numericValue > totalDeposit) {
				setIsGuarantorDisabled(false);
			} else {
				resetGuarantor();
			}
		}
	};

	const resetGuarantor = () => {
		setIsGuarantorDisabled(true);
		setSelectedGuarantor(null);
		setGuarantorDropdownValue("");
	};

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
	};

	const handleGuarantorInput = (e) => {
		const value = e.target.value;
		setGuarantorDropdownValue(value);
		setShowGuarantorDropdown(true);

		if (value === "") {
			setSelectedGuarantor("");
			setFilteredGuarantor(true);
		}

		const filtered = members.filter(
			(member) =>
				// ! put _ before id = _id
				member.id !== selectedMember?.id &&
				member.name.toLowerCase().startsWith(value.toLowerCase())
		);
		setFilteredGuarantor(filtered);
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

	const handleSave = async () => {
		const numericAmount = parseFloat(amount.replace(/,/g, ""));

		// Check if a member is selected
		if (!selectedMember) {
			setIsNoMemberModalVisible(true);
			setTimeout(() => {
				setIsNoMemberModalVisible(false);
			}, 2000);
			return;
		}

		// // Validate the amount
		// if (isNaN(numericAmount) || numericAmount <= 0) {
		// 	// Ensure amount is a valid positive number
		// 	setIsAmountErrorVisible(true);
		// 	setTimeout(() => {
		// 		setIsAmountErrorVisible(false);
		// 	}, 2000);
		// 	return;
		// }

		// if (numericAmount > totalAmount) {
		// 	setIsAmountErrorVisible(true);
		// 	setTimeout(() => {
		// 		setIsAmountErrorVisible(false);
		// 	}, 2000);
		// 	return;
		// }

		// // Validate if amount exceeds totalDeposit
		// if (numericAmount > totalDeposit) {
		// 	setIsAmountErrorVisible(true);
		// 	setTimeout(() => {
		// 		setIsAmountErrorVisible(false);
		// 	}, 2000);
		// 	return;
		// }

		if (amount > totalAmount && !selectedGuarantor) {
			setIsNoGuarantorVisible(true);
			setTimeout(() => {
				setIsNoGuarantorVisible(false);
			}, 2000);
			return;
		}

		// If all validations pass, proceed with saving the data
		const submissionData = {
			borrowerId: selectedMember.id,
			borrowerName: selectedMember.name,
			borrowerDeposit: selectedMember.totalDeposit,
			guarantorId: selectedGuarantor?.id || null,
			guarantorName: selectedGuarantor?.name || null,
			amount: numericAmount,
			date: new Date().toISOString().split("T")[0], // Date in YYYY-MM-DD format
		};
		setSubmissionData(submissionData);
		setConfirmationVisible(true);
	};

	const handleConfirmSave = async () => {
		try {
			const response = await axios.post(
				//! change to loan API,
				// "http://localhost:4000/loans",
				submissionData
			);

			console.log(submissionData);
			setIsSuccessModalVisible(true);
			setTimeout(() => {
				setIsSuccessModalVisible(false);
				resetForm();
				window.location.reload();
			}, 2000);
		} catch (error) {
			console.error("Error saving record:", error);
			setIsErrorModalVisible(true);
			setTimeout(() => {
				setIsErrorModalVisible(false);
			}, 2000);
		} finally {
			setConfirmationVisible(false);
		}
	};

	const handleCancel = () => {
		setConfirmationVisible(false);
		resetForm();
	};
	const resetForm = () => {
		setSelectedMember(null);
		setDropdownValue("");
		setAmount("");
		setIsAmountDisabled(true);
		setGuarantorDropdownValue("");
		setIsGuarantorDisabled(true);
		setFilteredMembers(members);
	};

	const handleCloseErrorModal = () => {
		setIsErrorModalVisible(false);
	};

	return (
		<>
			<div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 b-font w-full">
				<div className="bg-slate-50 p-8">
					<h1 className="text-2xl mb-10 font-bold">
						Total Amount: P <span>{total.toLocaleString()}</span>
					</h1>
					{showBorrow && (
						<>
							<div className="flex flex-col">
								<div className="flex justify-between space-x-8 mb-10 f-dash">
									<div className="flex">
										<p className="mr-4 text-2xl font-bold">Borrower:</p>
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
										</div>
									</div>
									<div className="flex">
										<p className="mr-4 text-2xl font-bold">Amount:</p>
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
											{errorMessage && (
												<p className="font-normal text-base absolute top-12 left-0 text-red-600 w-96">
													Loan amount cannot be greater than{" P "}
													{totalAmount.toLocaleString()}
												</p>
											)}
										</div>
									</div>
									<div className="flex">
										<p className="mr-4 text-2xl font-bold">Guarantor:</p>
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
										</div>
									</div>
								</div>

								<Separator />
								<div className="b-font mt-5">
									<h3 className="text-2xl font-bold">Summary:</h3>
									<div className="text-xl mt-3">
										<p className="font-semibold">
											Borrower: {selectedMember ? selectedMember.name : ""}
										</p>
										<p className="font-semibold">
											Total Deposit:{" "}
											{selectedMember ? selectedMember.totalDeposit : ""}
										</p>
										<p className="font-semibold">
											Amount: {amount ? `P${amount}` : " "}
										</p>
										<p className="font-semibold">
											Guarantor:{" "}
											{selectedGuarantor ? selectedGuarantor.name : "none"}
										</p>
									</div>
								</div>
							</div>
						</>
					)}

					{showPay && <div>bayad po</div>}

					<button className="paid-button" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</>
	);
};

export default TransactionModal;
