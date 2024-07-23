// "use client";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Separator from "../components/Separator";
// import CurrentDate from "../components/CurrentDate";
// import Loader from "../components/Loader/Loader";
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import AuthContext from "@/context/AuthContext";

// const Deposit = () => {
// 	const [members, setMembers] = useState([]);
// 	const [selectedMember, setSelectedMember] = useState(null);
// 	const [dropdownValue, setDropdownValue] = useState("");
// 	const amountDeposit = 300;
// 	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
// 	const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
// 	const [isNoMemberModalVisible, setIsNoMemberModalVisible] = useState(false);

// 	useEffect(() => {
// 		const fetchMembers = async () => {
// 			try {
// 				const response = await axios.get(
// 					"http://localhost:5000/api/deposit/depositList"
// 				);
// 				console.log("Fetched members:", response.data);
// 				setMembers(response.data);
// 			} catch (error) {
// 				console.error("Error fetching data:", error);
// 			}
// 		};

// 		fetchMembers();
// 	}, []);

// 	const handleSelectChange = (e) => {
// 		const memberId = e.target.value;
// 		console.log("Selected memberId:", memberId);
// 		const member = members.find((m) => m._id === memberId);
// 		setSelectedMember(member);
// 		setDropdownValue(memberId);
// 		console.log("Selected member:", member ? member.name : "None");
// 	};

// 	const handleSave = async () => {
// 		if (!selectedMember) {
// 			setIsNoMemberModalVisible(true);
// 			setTimeout(() => {
// 				setIsNoMemberModalVisible(false);
// 			}, 2000); // Delay for 2 seconds
// 			return;
// 		}

// 		const submissionData = {
// 			memberId: selectedMember._id,
// 			depositAmount: amountDeposit * selectedMember.numberOfBody,
// 		};

// 		try {
// 			const response = await axios.post(
// 				"http://localhost:5000/api/deposit/addDeposit",
// 				submissionData
// 			);

// 			setIsSuccessModalVisible(true);
// 			setTimeout(() => {
// 				setIsSuccessModalVisible(false);
// 				resetForm();
// 				window.location.reload();
// 			}, 2000);
// 		} catch (error) {
// 			console.error("Error saving record:", error);
// 			setIsErrorModalVisible(true);
// 			setTimeout(() => {
// 				setIsErrorModalVisible(false);
// 			}, 2000);
// 		}
// 	};

// 	const resetForm = () => {
// 		setSelectedMember(null);
// 		setDropdownValue(""); // Reset dropdown value to default
// 	};

// 	const handleCloseErrorModal = () => {
// 		setIsErrorModalVisible(false);
// 	};

// 	const { user } = useContext(AuthContext);
// 	if (user === null) {
// 		return <Loader />;
// 	}
// 	if (!user) {
// 		return null;
// 	}

// 	return (
// 		<>
// 			<Navbar />
// 			<Sidebar />
// 			<div className="content h-screen">
// 				<section className="flex justify-between items-center pb-10">
// 					<h1 className="f-heading">Deposit</h1>
// 					<CurrentDate />
// 				</section>
// 				<Separator />
// 				<div>
// 					<main className="h-60 p-12 border-2 border-sky-500 bg-sky-50 rounded-md">
// 						<div className="flex items-center text-2xl font-bold f-dash">
// 							<p className="mr-4">Member name:</p>
// 							<select
// 								onChange={handleSelectChange}
// 								value={dropdownValue}
// 								className="border-2 border-gray-800 rounded-md w-45"
// 							>
// 								<option value="" disabled>
// 									Select a member...
// 								</option>
// 								{members.map((member) => (
// 									<option key={member._id} value={member._id}>
// 										{member.name}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 						{selectedMember && (
// 							<div className="mt-4 justify-center text-xl font-semibold">
// 								<p>No. of Body: {selectedMember.numberOfBody}</p>
// 								<p>Amount: {amountDeposit * selectedMember.numberOfBody}</p>
// 							</div>
// 						)}
// 					</main>
// 				</div>
// 				<div className="flex justify-end">
// 					<button
// 						onClick={handleSave}
// 						className="primary-button hover:primary-button-hover mt-10"
// 					>
// 						Save
// 					</button>
// 				</div>
// 				{isSuccessModalVisible && (
// 					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
// 						<div className="bg-white p-20 rounded-md">
// 							<h2 className="text-xl text-green-600 font-bold mb-4">
// 								Record Successful!
// 							</h2>
// 						</div>
// 					</div>
// 				)}
// 				{isErrorModalVisible && (
// 					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
// 						<div className="bg-white p-20 rounded-md">
// 							<h2 className="text-xl text-red-600 font-bold mb-4">
// 								Error Occurred
// 							</h2>
// 							<p className="mb-4">Data not saved. Please try again.</p>
// 						</div>
// 					</div>
// 				)}
// 				{isNoMemberModalVisible && (
// 					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
// 						<div className="bg-white p-20 rounded-md">
// 							<h2 className="text-xl text-red-600 font-bold mb-4">
// 								No Member Selected
// 							</h2>
// 							<p className="mb-4">Please select a member before saving.</p>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// };

// export default Deposit;

"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import CurrentDate from "../components/CurrentDate";
import Loader from "../components/Loader/Loader";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const Deposit = () => {
	const [members, setMembers] = useState([]);
	const [filteredMembers, setFilteredMembers] = useState([]);
	const [selectedMember, setSelectedMember] = useState(null);
	const [dropdownValue, setDropdownValue] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const amountDeposit = 300;
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
	const [isNoMemberModalVisible, setIsNoMemberModalVisible] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/deposit/depositList"
				);
				console.log("Fetched members:", response.data);
				setMembers(response.data);
				setFilteredMembers(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchMembers();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setDropdownValue(value);
		setShowDropdown(true);

		const filtered = members.filter((member) =>
			member.name.toLowerCase().startsWith(value.toLowerCase())
		);
		setFilteredMembers(filtered);
	};

	const handleSelectMember = (member) => {
		setSelectedMember(member);
		setDropdownValue(member.name);
		setShowDropdown(false);
		console.debug("Selected member:", member);
		// Log member details
		console.log(`Selected Member ID: ${member._id}`);
		console.log(`Name: ${member.name}`);
		console.log(`No. of Body: ${member.numberOfBody}`);
		console.log(`Amount: ${amountDeposit * member.numberOfBody}`);
	};

	const handleSave = async () => {
		if (!selectedMember) {
			setIsNoMemberModalVisible(true);
			setTimeout(() => {
				setIsNoMemberModalVisible(false);
			}, 2000); // Delay for 2 seconds
			return;
		}

		const submissionData = {
			memberId: selectedMember._id,
			depositAmount: amountDeposit * selectedMember.numberOfBody,
		};

		try {
			const response = await axios.post(
				"http://localhost:5000/api/deposit/addDeposit",
				submissionData
			);

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
		}
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
		return <Loader />;
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
					<h1 className="f-heading">Deposit</h1>
					<CurrentDate />
				</section>
				<Separator />
				<div>
					<main className="h-60 p-12 border-2 border-sky-500 bg-sky-50 rounded-md">
						<div className="flex items-center text-2xl font-bold f-dash">
							<p className="mr-4">Member name:</p>
							<div className="relative w-45" ref={dropdownRef}>
								<input
									type="text"
									value={dropdownValue}
									onChange={handleInputChange}
									onClick={() => setShowDropdown(true)}
									className="border-2 border-gray-800 rounded-md w-full"
									placeholder="Select a member..."
								/>
								{showDropdown && (
									<div className="absolute left-0 right-0 bg-white border-2 border-gray-800 mt-1 rounded-md z-10 max-h-60 overflow-y-auto">
										{filteredMembers.length > 0 ? (
											filteredMembers.map((member) => (
												<div
													key={member._id}
													className="cursor-pointer p-2 hover:bg-gray-200"
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
						{selectedMember && (
							<div className="f-dash mt-4 justify-center text-xl font-semibold">
								<p>No. of Body: {selectedMember.numberOfBody}</p>
								<p>Amount: {amountDeposit * selectedMember.numberOfBody}</p>
							</div>
						)}
					</main>
				</div>
				<div className="flex justify-end">
					<button
						onClick={handleSave}
						className="primary-button hover:primary-button-hover mt-10"
					>
						Save
					</button>
				</div>
				{isSuccessModalVisible && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
						<div className="bg-white p-20 rounded-md">
							<h2 className="text-xl text-green-600 font-bold mb-4">
								Record Successful!
							</h2>
						</div>
					</div>
				)}
				{isErrorModalVisible && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
						<div className="bg-white p-20 rounded-md">
							<h2 className="text-xl text-red-600 font-bold mb-4">
								Error Occurred
							</h2>
							<p className="mb-4">Data not saved. Please try again.</p>
						</div>
					</div>
				)}
				{isNoMemberModalVisible && (
					<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
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

export default Deposit;
