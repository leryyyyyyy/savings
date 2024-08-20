import React, { useState, useEffect } from "react";
import axios from "axios";

const Total = () => {
	const [total, setTotal] = useState(0);
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

	return (
		<div className="flex f-subheading">
			<h3 className="text-4xl">
				Total amount:
				<span className="text-green-500 font-semibold mx-3">
					P{total !== null ? total.toLocaleString() : 0}
				</span>
			</h3>
		</div>
	);
};

export default Total;
