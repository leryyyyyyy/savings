// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const WeeklyView = () => {
// 	const [weeks, setWeeks] = useState([]);
// 	const [selectedWeek, setSelectedWeek] = useState(null);

// 	useEffect(() => {
// 		const fetchWeeks = async () => {
// 			try {
// 				const response = await axios.get(
// 					"http://localhost:5000/api/reports/weekly-data"
// 				);
// 				setWeeks(response.data);
// 			} catch (error) {
// 				console.error("Error fetching data:", error);
// 			}
// 		};

// 		fetchWeeks();
// 	}, []);

// 	return (
// 		<>
// 			<h1 className="f-subheading">Select a week to view deposit history.</h1>
// 			<div className="m-12">
// 				<div className="flex flex-col space-y-10">
// 					{weeks.map((week) => (
// 						<div key={`${week.year}-${week.week}`} className="relative">
// 							<div
// 								className={`dash-nav p-5 font-bold text-xl cursor-pointer ${
// 									selectedWeek === `${week.year}-${week.week}`
// 										? "dash-nav-hover scale-105 shadow-lg"
// 										: "hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
// 								}`}
// 								onClick={() =>
// 									setSelectedWeek(
// 										selectedWeek === `${week.year}-${week.week}`
// 											? null
// 											: `${week.year}-${week.week}`
// 									)
// 								}
// 							>
// 								{`Week ${week.week} (${week.startDate} - ${week.endDate})`}
// 							</div>
// 							{selectedWeek === `${week.year}-${week.week}` && (
// 								<div className="p-5">
// 									<div className="w-full overflow-x-auto">
// 										<table className="table-fixed w-full border-collapse f-body">
// 											<thead className="border-t-[1px] bg-light text-sky-700 sticky top-0 text-center">
// 												<tr>
// 													<th className="px-4 py-2 border-b-[1px] f-subheading">
// 														Name
// 													</th>
// 													<th className="px-4 py-2 border-b-[1px] f-subheading">
// 														Body Number
// 													</th>
// 													<th className="px-4 py-2 border-b-[1px] f-subheading">
// 														Amount
// 													</th>
// 													<th className="px-4 py-2 border-b-[1px] f-subheading">
// 														Date
// 													</th>
// 												</tr>
// 											</thead>
// 											<tbody>
// 												{week.membersWithDeposits.map((user) => (
// 													<tr key={user.memberId}>
// 														<td className="border px-4 py-2">
// 															{user.memberName}
// 														</td>
// 														<td className="border px-4 py-2 text-center">
// 															{user.memberId}
// 														</td>
// 														<td className="border px-4 py-2 flex justify-center items-center text-center ">
// 															{user.depositAmount || (
// 																<span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs ">
// 																	Not Paid
// 																</span>
// 															)}
// 														</td>
// 														<td className="border px-4 py-2 text-center">
// 															{user.date}
// 														</td>
// 													</tr>
// 												))}
// 												{week.membersWithoutDeposits.map((user) => (
// 													<tr key={user._id}>
// 														<td className="border px-4 py-2">{user.name}</td>
// 														<td className="border px-4 py-2 text-center">
// 															{user._id}
// 														</td>
// 														<td className="border px-4 py-2 flex justify-center items-center text-center ">
// 															<span className="bg-red-500 text-red-50 px-2 py-1 rounded-lg text-sm">
// 																Not Paid
// 															</span>
// 														</td>
// 														<td className="border px-4 py-2 text-center">
// 															N/A
// 														</td>
// 													</tr>
// 												))}
// 											</tbody>
// 										</table>
// 									</div>
// 								</div>
// 							)}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default WeeklyView;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const WeeklyView = () => {
	const [weeks, setWeeks] = useState([]);
	const [selectedWeek, setSelectedWeek] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const weeksPerPage = 4; // Number of weeks to display per page

	useEffect(() => {
		const fetchWeeks = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/reports/weekly-data"
				);
				setWeeks(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
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

	return (
		<>
			<h1 className="f-subheading">Select a week to view deposit history.</h1>
			<div className="m-12">
				<div className="flex justify-end m-10">
					<div className="space-x-4">
						<button
							className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-400"
							onClick={() => handlePageChange("prev")}
							disabled={currentPage === 0}
						>
							Previous
						</button>
						<button
							className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-400"
							onClick={() => handlePageChange("next")}
							disabled={startIndex + weeksPerPage >= weeks.length}
						>
							Next
						</button>
					</div>
				</div>

				<div className="flex flex-col space-y-10">
					{currentWeeks.map((week) => (
						<div key={`${week.year}-${week.week}`} className="relative">
							<div
								className={`dash-nav p-5 font-bold text-xl cursor-pointer ${
									selectedWeek === `${week.year}-${week.week}`
										? "dash-nav-hover scale-105 shadow-lg"
										: "hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
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
