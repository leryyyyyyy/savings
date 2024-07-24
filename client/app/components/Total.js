import React, { useState, useEffect } from "react";

const Total = () => {
	const [total, setTotal] = useState(0);

	useEffect(() => {
		fetch("http://localhost:4000/transactions")
			.then((response) => response.json())
			.then((data) => {
				const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
				setTotal(totalAmount);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<div className="flex f-subheading">
			<h3 className="text-4xl">
				Total amount:{" "}
				<span className="text-green-500 font-semibold">
					P{total.toLocaleString()}
				</span>
			</h3>
		</div>
	);
};

export default Total;
