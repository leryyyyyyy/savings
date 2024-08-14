import React, { useState, useEffect } from "react";

const Total = () => {
	const [total, setTotal] = useState(0);

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

	return (
		<div className="flex f-subheading">
			<h3 className="text-4xl">
				Total amount:{" "}
				<span className="text-green-500 font-semibold">
					{total ? total.toLocaleString() : 0}
				</span>
			</h3>
		</div>
	);
};

export default Total;
