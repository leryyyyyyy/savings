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
						<div key={week.id} className="relative">
							<div
								className={`dash-nav p-5 font-bold text-xl cursor-pointer ${
									selectedWeek === week.id
										? "dash-nav-hover scale-105 shadow-lg"
										: "hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
								}`}
								onClick={() =>
									setSelectedWeek(selectedWeek === week.id ? null : week.id)
								}
							>
								{week.name}
							</div>
							{selectedWeek === week.id && (
								<div className="p-5">
									<div className="w-full overflow-x-auto">
										<table className="table-fixed w-full border-collapse f-body">
											<thead className="border-t-[1px] bg-light text-sky-700 sticky top-0 text-center">
												<tr>
													<th className="px-4 py-2 border-b-[1px] f-subheading">
														Name
													</th>
													<th className="px-4 py-2 border-b-[1px] f-subheading">
														Body Number
													</th>
													<th className="px-4 py-2 border-b-[1px] f-subheading">
														Amount
													</th>
													<th className="px-4 py-2 border-b-[1px] f-subheading">
														Date
													</th>
												</tr>
											</thead>
											<tbody>
												{week.users?.map((user) => (
													<tr key={user.id}>
														<td className="border px-4 py-2">{user.name}</td>
														<td className="border px-4 py-2 text-center">
															{user.body}
														</td>
														<td className="border px-4 py-2 flex justify-center items-center text-center ">
															{user.amount || (
																<span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs ">
																	Not Paid
																</span>
															)}
														</td>
														<td className="border px-4 py-2 text-center">
															{user.date}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
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
