"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import Total from "../components/Total";
import CurrentDate from "../components/CurrentDate";
import Breadcrumb from "../components/Breadcrumb";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const Loan = () => {
	const [members, setMembers] = useState([]);
	const [selectedMember, setSelectedMember] = useState(null);
	const [filteredMembers, setFilteredMembers] = useState([]);
	const [dropdownValue, setDropdownValue] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [total, setTotal] = useState(0);
	const [totalDeposit, setTotalDeposit] = useState(0);
	const [isGuarantorDisabled, setIsGuarantorDisabled] = useState(true);
	const [filteredGuarantor, setFilteredGuarantor] = useState([]);
	const [guarantorDropdownValue, setGuarantorDropdownValue] = useState("");
	const [showGuarantorDropdown, setShowGuarantorDropdown] = useState(false);
	const guarantorDropdownRef = useRef(null);
	const [selectedGuarantor, setSelectedGuarantor] = useState(null);
	const [amount, setAmount] = useState("");
	const [submissionData, setSubmissionData] = useState({});
	const [confirmationVisible, setConfirmationVisible] = useState(false);
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
	const [isNoMemberModalVisible, setIsNoMemberModalVisible] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await axios.get(
					// ! replace with updated api "http://localhost:5000/api/members/memberList"
					"http://localhost:4000/members"
				);
				console.log(response.data);
				setMembers(response.data);
			} catch (err) {
				console.error("Error fetching members:", err);
			}
		};
		fetchMembers();
	}, []);

	useEffect(() => {
		fetch("http://localhost:4000/totalAmount")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				const amount = Number(data);
				if (!isNaN(amount)) {
					setTotal(amount);
				} else {
					console.error("Invalid total value:", data);
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	const handleSelectMember = (member) => {
		setSelectedMember(member);
		setDropdownValue(member.name);
		setTotalDeposit(member.totalDeposit);
		setShowDropdown(false);

		// ! after testing uncomment setFilteredGuarantor(members.filter((m) => m._id !== member._id));
		setFilteredGuarantor(members.filter((m) => m.id !== member.id));
		// ! put _ before id = _id
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

	// ! put _ before id = _id
	const handleGuarantorClick = () => {
		if (guarantorDropdownValue === "") {
			setFilteredGuarantor(members.filter((m) => m.id !== selectedMember?.id));
		}
		setShowGuarantorDropdown(true);
	};

	const handleInputBorrower = (e) => {
		const value = e.target.value;
		setDropdownValue(value);
		setShowDropdown(true);

		// Reset selected member if input is cleared
		if (value === "") {
			setSelectedMember(null);
			setSelectedGuarantor(null);
			setGuarantorDropdownValue("");
		}

		const filtered = members.filter((member) =>
			member.name.toLowerCase().startsWith(value.toLowerCase())
		);
		setFilteredMembers(filtered);
	};

	const handleGuarantorInput = (e) => {
		const value = e.target.value;
		setGuarantorDropdownValue(value);
		setShowGuarantorDropdown(true);

		// Reset selected guarantor if input is cleared
		if (value === "") {
			setSelectedGuarantor(null);
		}

		const filtered = members.filter(
			(member) =>
				// ! put _ before id = _id
				member.id !== selectedMember?.id &&
				member.name.toLowerCase().startsWith(value.toLowerCase())
		);
		setFilteredGuarantor(filtered);
	};

	const handleSelectGuarantor = (member) => {
		setSelectedGuarantor(member);
		setGuarantorDropdownValue(member.name);
		setShowGuarantorDropdown(false);
	};

	const handleAmountChange = (e) => {
		let value = e.target.value.replace(/,/g, "");

		if (!isNaN(value)) {
			value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			setAmount(value);
		}

		const numericValue = parseFloat(value.replace(/,/g, ""));
		if (!isNaN(numericValue)) {
			// Compare against total instead of amount
			if (numericValue > totalDeposit) {
				setIsGuarantorDisabled(false);
			} else {
				setIsGuarantorDisabled(true);
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

	const handleSave = async () => {
		if (!selectedMember) {
			setIsNoMemberModalVisible(true);
			setTimeout(() => {
				setIsNoMemberModalVisible(false);
			}, 2000);
			return;
		}

		//! Modify submission data
		const submissionData = {
			// ! put _ before id = _id
			borrowerId: selectedMember.id,
			borrowerName: selectedMember.name,
			borrowerDeposit: selectedMember.totalDeposit,
			guarantorId: selectedGuarantor?.id || null,
			guarantorName: selectedGuarantor?.name || null,
			amount: amount,
			date: new Date().toISOString().split("T")[0], // Date in YYYY-MM-DD format
		};
		setSubmissionData(submissionData);
		setConfirmationVisible(true);
	};

	const handleConfirmSave = async () => {
		try {
			const response = await axios.post(
				//! change to loan API "http://localhost:4000/loans",
				"http://localhost:4000/loans",
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
	};
	const resetForm = () => {
		setSelectedMember(null);
		setDropdownValue("");
		setFilteredMembers(members);
	};

	const handleCloseErrorModal = () => {
		setIsErrorModalVisible(false);
	};

	const { user } = useContext(AuthContext);
	if (user === null) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader />
			</div>
		);
	}
	if (!user) {
		return null;
	}

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="content h-screen">
				<section className="flex justify-between items-center pb-10">
					<Total />
					<CurrentDate />
				</section>
				<Separator />

				<Breadcrumb />
				<h1 className="f-heading pb-8">Loan</h1>
				<main className="h-auto p-8 border-2 border-sky-500 bg-sky-50 rounded-md b-font">
					<div className="flex justify-between f-dash mb-10 mt-5 b-font ">
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
											<div className="p-2 text-gray-500">No matches found</div>
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
								/>
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
											<div className="p-2 text-gray-500">No matches found</div>
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
								Guarantor: {selectedGuarantor ? selectedGuarantor.name : "none"}
							</p>
							<p className="font-semibold">
								Amount: {amount ? `P${amount}` : " "}
							</p>
							{/* //TODO: put a warning message under if amount exceeds total amount. */}
						</div>
					</div>
				</main>

				<div className="flex justify-end">
					<button
						onClick={handleSave}
						className="primary-button hover:primary-button-hover mt-10"
					>
						Save
					</button>
				</div>

				{confirmationVisible && (
					<div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
						<div className="bg-white p-10 rounded-md b-font">
							<h2 className="text-2xl font-bold">
								You are about to record the following information:
							</h2>
							<div className="text-lg font-semibold py-5">
								<p> Borrower: {selectedMember ? selectedMember.name : ""}</p>
								<p>
									Guarantor: {selectedGuarantor ? selectedGuarantor.name : ""}
								</p>
								<p>Amount: {amount ? `P${amount}` : " "}</p>
							</div>
							<div className="flex justify-between">
								<button
									onClick={handleCancel}
									className="text-lg warning-button hover:warning-button-hover"
								>
									Cancel
								</button>
								<button
									onClick={handleConfirmSave}
									className="text-lg paid-button hover:paid-button-hover"
								>
									Proceed
								</button>
							</div>
						</div>
					</div>
				)}

				{isSuccessModalVisible && (
					<div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
						<div className="bg-white p-20 rounded-md">
							<h2 className="text-xl text-green-600 font-bold mb-4">
								Record Successful!
							</h2>
						</div>
					</div>
				)}
				{isErrorModalVisible && (
					<div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
						<div className="bg-white p-20 rounded-md">
							<h2 className="text-xl text-red-600 font-bold mb-4">
								Error Occurred
							</h2>
							<p className="mb-4">Data not saved. Please try again.</p>
						</div>
					</div>
				)}
				{isNoMemberModalVisible && (
					<div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
						<div className="bg-white p-20 rounded-md">
							<h2 className="text-xl text-red-600 font-bold mb-4">
								No Member Selected
							</h2>
							<p className="mb-4">Please select a member before saving.</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Loan;
