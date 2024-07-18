"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import CurrentDate from "../components/CurrentDate";
import React, { useState, useEffect } from "react";

const Deposit = () => {
	const [members, setMembers] = useState([]);
	const [selectedMember, setSelectedMember] = useState(null);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await fetch("http://localhost:4000/members");
				if (!response.ok) {
					throw new Error("Failed to fetch members");
				}
				const data = await response.json();
				setMembers(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchMembers();
	}, []);

	const handleSelectChange = (e) => {
		const memberId = parseInt(e.target.value);
		const member = members.find((m) => m.id === memberId);
		setSelectedMember(member);
	};

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="ml-64 flex-1 p-10">
				<div className="flex justify-between items-center pb-10">
					<h1 className="f-heading">Deposit</h1>
					<CurrentDate />
				</div>
				<Separator />
				<div className="flex">
					<p>Members: </p>
					<select onChange={handleSelectChange}>
						<option value="" disabled selected>
							Select a member...
						</option>
						{members.map((member) => (
							<option key={member.id} value={member.id}>
								{member.name}
							</option>
						))}
					</select>
				</div>
				{selectedMember && (
					<div>
						<p>No. of Body: {selectedMember.noOfBody}</p>
						<p>Amount: {selectedMember.amount}</p>
					</div>
				)}

				<div>
					<button className="primary-button hover:primary-button-hover">
						Save
					</button>
				</div>
			</div>
		</>
	);
};

export default Deposit;
