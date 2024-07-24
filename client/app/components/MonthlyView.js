"use client";
import WeeklyView from "./WeeklyView";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MonthlyView = () => {
	const [months, setMonths] = useState([]);
	const [selectedMonth, setSelectedMonth] = useState(null);

	useEffect(() => {
		const fetchMonths = async () => {
			try {
				const response = await axios.get("http://localhost:4000/months");
				setMonths(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchMonths();
	}, []);

	return (
		<div className="space-y-12">
			<div className="grid grid-cols-3 gap-12">
				{months.map((month) => (
					<div
						key={month.id}
						className="dash-nav hover:dash-nav-hover p-10 font-bold text-xl hover:scale-105 hover:shadow-lg cursor-pointer"
						onClick={() => setSelectedMonth(month.id)}
					>
						{month.name}
					</div>
				))}
			</div>
            <div>
                <WeeklyView/>
            </div>
		</div>
	);
};

export default MonthlyView;
