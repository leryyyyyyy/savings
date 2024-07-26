"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader/Loader"; // Assuming you have a Loader component

const WeeklyView = () => {
	const [weeks, setWeeks] = useState([]);
	const [selectedWeek, setSelectedWeek] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(true); // Add loading state
	const weeksPerPage = 4; // Number of weeks to display per page

	useEffect(() => {
		const fetchWeeks = async () => {
			try {
				setLoading(true); // Set loading to true when fetching starts
				const response = await axios.get(
					"http://localhost:5000/api/reports/weekly-data"
				);
				const fetchedWeeks = response.data;

				// Get current week
				const now = new Date();
				const startOfYear = new Date(now.getFullYear(), 0, 1);
				const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
				const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
				const currentWeek = { week: weekNumber, year: now.getFullYear() };

				// Sort weeks: current week first, then by year and week number
				const sortedWeeks = fetchedWeeks.sort((a, b) => {
					if (a.year === currentWeek.year && a.week === currentWeek.week) {
						return -1; // Move current week to the top
					}
					if (b.year === currentWeek.year && b.week === currentWeek.week) {
						return 1; // Move current week to the top
					}
					return a.year === b.year ? a.week - b.week : a.year - b.year;
				});

				setWeeks(sortedWeeks);
				setLoading(false); // Set loading to false once data is fetched
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false); // Set loading to false in case of an error
			}
		};

		fetchWeeks();
	}, []);

	const handlePageChange = (direction) => {
		setCurrentPage((prevPage) => {
			if (direction === "prev") {
				return Math.max(prevPage - 1, 0);
			} else if (direction === "next") {
				return Math.min(
					prevPage + 1,
					Math.ceil(weeks.length / weeksPerPage) - 1
				);
			}
			return prevPage;
		});
	};

	const startIndex = currentPage * weeksPerPage;
	const currentWeeks = weeks.slice(startIndex, startIndex + weeksPerPage);

	// Get current week outside of useEffect for use in rendering
	const now = new Date();
	const startOfYear = new Date(now.getFullYear(), 0, 1);
	const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
	const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
	const currentWeek = { week: weekNumber, year: now.getFullYear() };

	return (
		<>
			<h1 className="text-2xl font-semibold mb-8">
				Select a week to view deposit history.
			</h1>
			<div className="m-12">
				<div className="flex justify-end mb-10">
					<div className="space-x-4">
						<button
							className="text-white px-4 py-2 bg-sky-500 rounded disabled:bg-gray-400"
							onClick={() => handlePageChange("prev")}
							disabled={currentPage === 0}
						>
							Previous
						</button>
						<button
							className="text-white px-4 py-2 bg-sky-500 rounded disabled:bg-gray-400"
							onClick={() => handlePageChange("next")}
							disabled={startIndex + weeksPerPage >= weeks.length}
						>
							Next
						</button>
					</div>
				</div>

				{loading && (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				)}

				{/* Weeks Display */}
				<div className="flex flex-col space-y-10">
					{currentWeeks.map((week) => (
						<div key={`${week.year}-${week.week}`} className="relative">
							<div
								className={`p-5 font-bold text-xl cursor-pointer transition duration-300 ease-in-out ${
									selectedWeek === `${week.year}-${week.week}` ||
									(week.year === currentWeek.year &&
										week.week === currentWeek.week)
										? "bg-sky-600 border-2 text-sky-50 rounded-lg shadow-lg"
										: "hover:bg-gray-100 hover:scale-105 hover:shadow-md"
								}`}
								onClick={() =>
									setSelectedWeek(
										selectedWeek === `${week.year}-${week.week}`
											? null
											: `${week.year}-${week.week}`
									)
								}
							>
								{`Week ${week.week} (${week.startDate} - ${week.endDate})`}
							</div>

							{selectedWeek === `${week.year}-${week.week}` && (
								<div className="p-5">
									<div className="w-full overflow-x-auto">
										<table className="h-80 table-fixed w-full border-collapse">
											<thead className="border-t-[1px] bg-light text-sky-700 sticky top-0 text-center">
												<tr>
													<th className="px-4 py-2 border-b-[1px] font-semibold">
														Name
													</th>
													<th className="px-4 py-2 border-b-[1px] font-semibold">
														Body Number
													</th>
													<th className="px-4 py-2 border-b-[1px] font-semibold">
														Amount
													</th>
													<th className="px-4 py-2 border-b-[1px] font-semibold">
														Date
													</th>
												</tr>
											</thead>
											<tbody>
												{week.membersWithDeposits.map((user) => (
													<tr key={user.memberId}>
														<td className="border px-4 py-2">
															{user.memberName}
														</td>
														<td className="border px-4 py-2 text-center">
															{user.memberId}
														</td>
														<td className="border px-4 py-2 flex justify-center items-center text-center">
															{user.depositAmount || (
																<span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs">
																	Not Paid
																</span>
															)}
														</td>
														<td className="border px-4 py-2 text-center">
															{user.date}
														</td>
													</tr>
												))}
												{week.membersWithoutDeposits.map((user) => (
													<tr key={user._id}>
														<td className="border px-4 py-2">{user.name}</td>
														<td className="border px-4 py-2 text-center">
															{user._id}
														</td>
														<td className="border px-4 py-2 flex justify-center items-center text-center">
															<span className="bg-red-500 text-red-50 px-2 py-1 rounded-lg text-sm">
																Not Paid
															</span>
														</td>
														<td className="border px-4 py-2 text-center">
															N/A
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
