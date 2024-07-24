import React, { useState, useEffect } from "react";
import axios from "axios";

const MemberCount = () => {
	const [memberCount, setMemberCount] = useState(0);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/members/memberList"
				);
				setMemberCount(response.data.length); // Use the length of the data array
			} catch (err) {
				console.error("Error fetching members:", err);
			}
		};

		fetchMembers();
	}, []);

	return (
		<div className="flex f-subheading">
			<h3 className="text-2xl">
				Member count:{" "}
				<span className="text-green-500 font-semibold">{memberCount}</span>
			</h3>
		</div>
	);
};

export default MemberCount;
