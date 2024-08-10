"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import Total from "../components/Total";
import CurrentDate from "../components/CurrentDate";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const Loan = () => {
	const [members, setMembers] = useState([]);
	const [selectedMember, setSelectedMember] = useState(null);
	const [filteredMembers, setFilteredMembers] = useState([]);
	const [dropdownValue, setDropdownValue] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [guarantorDropdownValue, setGuarantorDropdownValue] = useState("");
	const [filteredGuarantor, setFilteredGuarantor] = useState([]);
	const [showGuarantorDropdown, setShowGuarantorDropdown] = useState(false);
	const dropdownRef = useRef(null);
	const guarantorDropdownRef = useRef(null);
	const [selectedGuarantor, setSelectedGuarantor] = useState(null);
	const [amount, setAmount] = useState("");

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/members/memberList"
				);
				console.log(response.data);
				setMembers(response.data);
			} catch (err) {
				console.error("Error fetching members:", err);
			}
		};
		fetchMembers();
	}, []);

	const handleSelectMember = (member) => {
		setSelectedMember(member);
		setDropdownValue(member.name);
		setShowDropdown(false);
		setFilteredGuarantor(members.filter((m) => m._id !== member._id));
		// Clear guarantor if the same member was selected
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

	const handleGuarantorClick = () => {
		if (guarantorDropdownValue === "") {
			setFilteredGuarantor(
				members.filter((m) => m._id !== selectedMember?._id)
			);
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
				member._id !== selectedMember?._id &&
				member.name.toLowerCase().startsWith(value.toLowerCase())
		);
		setFilteredGuarantor(filtered);
	};

	const handleSelectGuarantor = (member) => {
		setSelectedGuarantor(member);
		setGuarantorDropdownValue(member.name);
		setShowGuarantorDropdown(false);
	};

	const formatAmount = (value) => {
		return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const handleAmountChange = (e) => {
		const value = e.target.value.replace(/,/g, "");
		if (!isNaN(value)) {
			setAmount(formatAmount(value));
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
							<p className="mr-4 text-2xl font-bold">Guarantor:</p>
							<div className="relative w-45" ref={guarantorDropdownRef}>
								<input
									type="text"
									value={guarantorDropdownValue}
									onChange={handleGuarantorInput}
									onClick={handleGuarantorClick}
									className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
									placeholder="Select a guarantor..."
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
					</div>
					<Separator />
					<div className="b-font mt-5">
						<h3 className="text-2xl font-bold">Summary:</h3>
						<div className="text-xl mt-3">
							<p className="font-semibold">
								Borrower: {selectedMember ? selectedMember.name : ""}
							</p>
							<p className="font-semibold">
								Guarantor: {selectedGuarantor ? selectedGuarantor.name : ""}
							</p>
							<p className="font-semibold">
								Amount: {amount ? `P${amount}` : " "}
							</p>
							{/* //TODO: put a warning message under if amount exceeds total amount. */}
						</div>
					</div>
				</main>

				<div className="flex justify-end">
					<button className="primary-button hover:primary-button-hover mt-10">
						Save
					</button>
				</div>
			</div>
		</>
	);
};

export default Loan;
