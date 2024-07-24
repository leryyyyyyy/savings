import React, { useState, useEffect } from "react";
import axios from "axios";

const WeeklyView = () => {
	const [weeks, setWeeks] = useState([]);

	useEffect(() => {
		const fetchWeeks = async () => {
			try {
				const response = await axios.get("http://localhost:4000/weeks");
				setWeeks(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchWeeks();
	}, []);

	return (
		<div className="space-y-12">
			<div className="grid grid-cols-4 gap-12">
				{weeks.map((week) => (
					<div
						key={week.id}
						className="dash-nav hover:dash-nav-hover p-10 font-bold text-xl  hover:scale-105 hover:shadow-lg"
					>
						{week.name}
					</div>
				))}
			</div>
		</div>
	);
};

export default WeeklyView;
