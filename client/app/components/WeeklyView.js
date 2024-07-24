"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const WeeklyView = () => {
	const [weeks, setWeeks] = useState([]);
	const [selectedWeek, setSelectedWeek] = useState(null);

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
		<>
			<h1 className="f-subheading">Select a week to view deposit history.</h1>
			<div className="m-12">
				<div className="flex flex-col space-y-10">
					{weeks.map((week) => (
						<div key={week.id}>
							<div
								className="dash-nav hover:dash-nav-hover p-5 font-bold text-xl hover:scale-105 hover:shadow-lg cursor-pointer"
								onClick={() =>
									setSelectedWeek(selectedWeek === week.id ? null : week.id)
								}
							>
								{week.name}
							</div>
							{selectedWeek === week.id && (
								<div className="p-5">
									<table className="table-auto w-full border-collapse ">
										<thead className="border-t-[1px] bg-light text-sky-700 text-left sticky top-0">
											<tr>
												<th className="px-4 py-2 border-b-[1px] f-subheading">
													Name
												</th>
												<th className="px-4 py-2 border-b-[1px] f-subheading">
													Contact No.
												</th>

												<th className="px-4 py-2 border-b-[1px] f-subheading text-center">
													Body Number
												</th>
												<th className="px-4 py-2 border-b-[1px] f-subheading text-center">
													Amount
												</th>
											</tr>
										</thead>
										<tbody>
											{week.users?.map((user) => (
												<tr key={user.id}>
													<td className="border px-4 py-2">{user.id}</td>
													<td className="border px-4 py-2">{user.name}</td>
													<td className="border px-4 py-2">{user.email}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default WeeklyView;
