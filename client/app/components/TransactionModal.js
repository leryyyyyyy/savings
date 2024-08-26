"use client";
import React, { useEffect, useRef, useReducer } from "react";
import Props from "prop-types";
import Separator from "./Separator";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import ErrorMessage from "./ErrorMessage";
import Modal from "./Modal";
import Button from "./Button";

const initialState = {
	members: [],
	selectedMember: null,
	filteredMembers: [],
	dropdownValue: "",
	showDropdown: false,
	totalAmount: 0,
	isGuarantorDisabled: true,
	filteredGuarantors: [],
	guarantorDropdownValue: "",
	showGuarantorDropdown: false,
	selectedGuarantor: null,
	amount: null,
	isAmountDisabled: true,
	invalidAmount: false,
	noGuarantor: false,
	saveDisabled: true,
};

const actions = {
	SET_MEMBERS: "SET_MEMBERS",
	SELECT_MEMBER: "SELECT_MEMBER",
	TOTAL_AMOUNT: "TOTAL_AMOUNT",
	SET_DROPDOWN_VALUE: "SET_DROPDOWN_VALUE",
	TOGGLE_DROPDOWN: "TOGGLE_DROPDOWN",
	FILTER_MEMBERS: "FILTER_MEMBERS",
	SET_GUARANTOR: "SET_GUARANTOR",
	SET_AMOUNT: "SET_AMOUNT",
	INVALID_AMOUNT: "INVALID_AMOUNT",
	SHOW_DROPDOWN: "SHOW_DROPDOWN",
	HIDE_DROPDOWN: "HIDE_DROPDOWN",
	FILTER_GUARANTORS: "FILTER_GUARANTORS",
	SHOW_GUARANTOR_DROPDOWN: "SHOW_GUARANTOR_DROPDOWN",
	HIDE_GUARANTOR_DROPDOWN: "HIDE_GUARANTOR_DROPDOWN",
	RESET_FORM: "RESET_FORM",

	SET_GUARANTOR_DROPDOWN_VALUE: "SET_GUARANTOR_DROPDOWN_VALUE",
	FILTER_GUARANTORS: "FILTER_GUARANTORS",
	RESET_GUARANTOR: "RESET_GUARANTOR",
	SET_NO_GUARANTOR_SELECTED: "SET_NO_GUARANTOR_SELECTED",
	ENABLE_SAVE: "ENABLE_SAVE",
};

function formValidation(state, action) {
	switch (action.type) {
		case actions.TOTAL_AMOUNT:
			return { ...state, totalAmount: action.payload };

		case actions.SET_MEMBERS:
			return {
				...state,
				members: action.payload,
				filteredMembers: action.payload,
			};

		case actions.SELECT_MEMBER:
			const member = action.payload;
			return {
				...state,
				selectedMember: member,
				dropdownValue: member.name,
				totalDeposit: member.totalDeposit,
				showDropdown: false,
				isAmountDisabled: false,
				filteredGuarantors: state.members.filter((m) => m.id !== member.id),
				selectedGuarantor: null,
				guarantorDropdownValue: "",
				saveDisabled: false,
			};

		case actions.TOGGLE_DROPDOWN:
			return { ...state, showDropdown: !state.showDropdown };

		case actions.FILTER_MEMBERS:
			return {
				...state,
				filteredMembers: action.payload,
			};

		case actions.SET_AMOUNT:
			const { formattedValue, loanAmount } = action.payload;
			const overTotalAmount = loanAmount > state.totalAmount;
			const overTotalDeposit =
				loanAmount > state.selectedMember?.totalDeposit || false;
			return {
				...state,
				amount: formattedValue,
				rawAmount: loanAmount,
				invalidAmount: overTotalAmount || overTotalDeposit,
				isGuarantorDisabled: !overTotalDeposit || overTotalAmount,
				noGuarantor: !overTotalAmount && overTotalDeposit,
				selectedGuarantor: !overTotalAmount && overTotalDeposit,
			};
		case actions.FILTER_GUARANTORS:
			const filteredGuarantors = state.members.filter((member) =>
				member.name.toLowerCase().startsWith(action.payload.toLowerCase())
			);
			return { ...state, filteredGuarantors };
		case actions.SET_GUARANTOR:
			return {
				...state,
				selectedGuarantor: action.payload,
				guarantorDropdownValue: action.payload?.name || "",
				noGuarantor: false,
			};
		case actions.SET_GUARANTOR_DROPDOWN_VALUE:
			return { ...state, guarantorDropdownValue: action.payload };

		case actions.FILTER_GUARANTORS:
			return {
				...state,
				filteredGuarantors: action.payload,
				noGuarantor: action.payload.length === 0,
			};

		case actions.RESET_GUARANTOR:
			return {
				...state,
				selectedGuarantor: null,
				noGuarantor: true,
				guarantorDropdownValue: "",
				showGuarantorDropdown: true,
				selectedGuarantor: null,
			};

		case actions.SET_NO_GUARANTOR_SELECTED:
			return { ...state, noGuarantor: action.payload };

		case actions.INVALID_AMOUNT:
			return { ...state, invalidAmount: false };

		case actions.SHOW_DROPDOWN:
			return { ...state, showDropdown: action.payload };

		case actions.HIDE_DROPDOWN:
			return { ...state, showDropdown: false };

		case actions.SHOW_GUARANTOR_DROPDOWN:
			return { ...state, showGuarantorDropdown: true };

		case actions.HIDE_GUARANTOR_DROPDOWN:
			return { ...state, showGuarantorDropdown: false };
		case actions.RESET_FORM:
			return {
				...state,
				dropdownValue: "",
				showDropdown: true,
				selectedMember: null,
				totalDeposit: 0,
				amount: "",
				invalidAmount: false,
				isAmountDisabled: true,
				isGuarantorDisabled: true,
				guarantorDropdownValue: "",
				noGuarantor: false,
				selectedGuarantor: null,
				saveDisabled: true,
			};
		case actions.ENABLE_SAVE:
			return {
				...state,
				saveDisabled: !action.payload,
			};
		default:
			return state;
	}
}

const TransactionModal = ({ showBorrow, showPay, onClose }) => {
	const [state, dispatch] = useReducer(formValidation, initialState);
	const dropdownRef = useRef(null);
	const guarantorDropdownRef = useRef(null);

	useEffect(() => {
		const fetchTotalDepositAmount = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/amount/totalDepositAmount"
				);
				dispatch({
					type: actions.TOTAL_AMOUNT,
					payload: response.data.overallTotalDepositAmount,
				});
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};

		fetchTotalDepositAmount();
	}, []);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/members");
				console.log("fetched members: ", response.data);
				dispatch({ type: actions.SET_MEMBERS, payload: response.data });
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchMembers();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				state.showDropdown
			) {
				dispatch({ type: actions.HIDE_DROPDOWN });
			}

			if (
				guarantorDropdownRef.current &&
				!guarantorDropdownRef.current.contains(event.target) &&
				state.showGuarantorDropdown
			) {
				dispatch({ type: actions.HIDE_GUARANTOR_DROPDOWN });
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [state.showDropdown, state.showGuarantorDropdown]);

	const handleDropdownClick = () => {
		dispatch({ type: actions.TOGGLE_DROPDOWN });
	};

	const handleInputBorrower = (e) => {
		const value = e.target.value;
		dispatch({ type: actions.SET_DROPDOWN_VALUE, payload: value });
		dispatch({ type: actions.SHOW_DROPDOWN, payload: true });

		if (value.trim() === "") {
			dispatch({ type: actions.RESET_FORM }); // Reset form to initial state
		} else {
			const filtered = state.members.filter((member) =>
				member.name.toLowerCase().startsWith(value.toLowerCase())
			);

			dispatch({ type: actions.FILTER_MEMBERS, payload: filtered });
		}
	};

	const handleSelectMember = (member) => {
		dispatch({ type: actions.SELECT_MEMBER, payload: member });
		dispatch({ type: actions.HIDE_DROPDOWN }); // Hide dropdown after selecting a member
		checkEnableSave();
	};

	const handleAmountChange = (e) => {
		const loanValue = e.target.value;
		let rawValue = loanValue.replace(/,/g, "").trim();
		const loanAmount = parseFloat(rawValue) || 0;
		const formattedValue = loanAmount.toLocaleString();

		dispatch({
			type: actions.SET_AMOUNT,
			payload: { formattedValue, loanAmount },
		});

		checkEnableSave();
	};

	const handleGuarantorInput = (e) => {
		const value = e.target.value;
		dispatch({ type: actions.SET_GUARANTOR_DROPDOWN_VALUE, payload: value });
		dispatch({ type: actions.SHOW_GUARANTOR_DROPDOWN, payload: true });

		if (value.trim() === "") {
			dispatch({ type: actions.RESET_GUARANTOR });
		} else {
			const filtered = state.members.filter(
				(member) =>
					state.members.filter((m) => m.id !== member.id) &&
					member.name.toLowerCase().startsWith(action.payload.toLowerCase())
			);
			console.log("Filtered guarantors:", filtered);
			dispatch({ type: actions.FILTER_GUARANTORS, payload: filtered });
			dispatch({
				type: actions.SET_NO_GUARANTOR_SELECTED,
				payload: filtered.length === 0,
			});
		}
	};

	const handleGuarantorClick = () => {
		dispatch({ type: actions.SHOW_GUARANTOR_DROPDOWN });
	};

	const handleSelectGuarantor = (guarantor) => {
		dispatch({ type: actions.SET_GUARANTOR, payload: guarantor });
		dispatch({ type: actions.HIDE_GUARANTOR_DROPDOWN }); // Hide dropdown after selecting a guarantor
		checkEnableSave();
	};

	const loanErrorMsg = () => {
		if (state.rawAmount > state.totalAmount) {
			return `Loan amount cannot be greater than ${state.totalAmount.toLocaleString()}`;
		}
		if (
			state.rawAmount > state.selectedMember?.totalDeposit &&
			!state.selectedGuarantor
		) {
			return `Guarantor is required`;
		}
		// return "Invalid input";
	};

	function checkEnableSave() {
		const canSave =
			state.selectedMember &&
			((state.rawAmount > state.totalAmount && state.selectedGuarantor) ||
				state.rawAmount <= state.totalAmount);

		dispatch({
			type: actions.ENABLE_SAVE,
			payload: canSave,
		});
	}

	return (
		<>
			<div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 b-font w-full h-auto">
				<div className="bg-slate-50 p-8">
					<h1 className="text-2xl mb-10 font-bold">
						Total Amount: P<span>{state.totalAmount.toLocaleString()}</span>
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
												value={state.dropdownValue}
												onChange={handleInputBorrower}
												onClick={handleDropdownClick}
												className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
												placeholder="Select a member..."
												required
											/>
											{state.showDropdown && (
												<div className="absolute left-0 right-0 bg-white border-2 border-gray-800 rounded-md z-10 max-h-60 overflow-y-auto">
													{state.filteredMembers.length > 0 ? (
														state.filteredMembers.map((member) => (
															<div
																key={member.id}
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
										<p className="mr-4 text-2xl font-semibold">Amount:</p>
										<div className="relative w-45">
											<input
												required
												type="text"
												value={state.amount || ""}
												onChange={handleAmountChange}
												className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
												placeholder="Enter amount..."
												disabled={state.isAmountDisabled}
											/>

											{state.invalidAmount && (
												<ErrorMessage errorMessage={loanErrorMsg()} />
											)}
										</div>
									</div>
									<div className="flex">
										<p className="mr-4 text-2xl font-semibold">Guarantor:</p>
										<div className="relative w-45" ref={guarantorDropdownRef}>
											<input
												type="text"
												value={state.guarantorDropdownValue}
												onChange={handleGuarantorInput}
												onClick={handleGuarantorClick}
												className="border-2 border-gray-800 rounded-md w-full text-xl p-1"
												placeholder="Select a guarantor..."
												disabled={state.isGuarantorDisabled}
											/>
											{state.showGuarantorDropdown && (
												<div className="absolute left-0 right-0 bg-white border-2 border-gray-800 rounded-md z-10 max-h-60 overflow-y-auto">
													{state.filteredGuarantors.length > 0 ? (
														state.filteredGuarantors.map((guarantor) => (
															<div
																key={guarantor._id}
																className="text-xl cursor-pointer p-2 hover:bg-gray-200"
																onClick={() => handleSelectGuarantor(guarantor)}
															>
																{guarantor.name}
															</div>
														))
													) : (
														<div className="p-2 text-gray-500">
															No matches found
														</div>
													)}
												</div>
											)}

											{state.noGuarantor && (
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
												{state.selectedMember ? state.selectedMember.name : ""}
											</span>
										</p>
										<p className="font-semibold">
											Total Deposit:
											<span className="ml-2">
												{state.selectedMember
													? `P${state.selectedMember.totalDeposit.toLocaleString()}`
													: ""}
											</span>
										</p>
										<p className="font-semibold">
											Amount:
											<span className="ml-2">{state.amount || "N/A"}</span>
										</p>
										<p className="font-semibold">
											Guarantor:
											<span className="ml-2">
												{state.selectedGuarantor
													? state.selectedGuarantor.name
													: "none"}
											</span>
										</p>
									</div>
								</div>
							</div>
						</>
					)}

					{showPay && <div>bayad po</div>}

					<div className="flex items-center justify-between mt-10">
						<Button variant="warning" onClick={onClose}>
							Close
						</Button>
						<button
							className="primary-button"
							onClick={state.handleSave}
							disabled={state.saveDisabled}
						>
							Save
						</button>
					</div>
				</div>
			</div>

			{state.confirmationModalVisible && (
				<ConfirmationModal
					message={"You are about to record the following information."}
					memberName={submissionData.borrowerName}
					amount={submissionData.amount}
					guarantor={submissionData.guarantorName}
					onCancel={handleCancel}
					onConfirm={handleConfirmSave}
				/>
			)}
			{state.failedSave && <Modal message={"Error saving data."} />}
			{state.successModalVisible && (
				<Modal message={"Record saved successfully"} />
			)}
		</>
	);
};

export default TransactionModal;
