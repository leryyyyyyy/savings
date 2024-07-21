"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import Loader from "../components/Loader/Loader";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Reports = () => {
	const [months, setMonths] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:4000/months");
				const data = await response.json();
				const fetchedMonths = data.months; // Assuming your JSON structure has a "months" property
				setMonths(fetchedMonths); // Update the state with fetched data
				console.log(fetchedMonths);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Render your component based on user state
	if (user === null) {
		return <Loader />; // Show loading animation if user state is null
	}
	if (!user) {
		return null; // Return null if user is not logged in
	}

	const handleDivClick = (monthId) => {
		// Handle the click event here (e.g., navigate to a specific page)
		console.log(`Clicked month with id ${monthId}`);
	};

	return (
		<>
			{/* Your component structure */}
			<Navbar />
			<Sidebar />
			<div className="content h-screen">
				{/* Other components and UI elements */}
				<section className="flex justify-between items-center pb-10">
					<h1 className="f-heading">Reports</h1>
				</section>
				<Separator />
				<main>
					<div>
						{months.map((month, index) => (
							<div
								key={index}
								onClick={() => handleDivClick(month.id)} // Pass the month ID
								style={{ cursor: "pointer" }} // Add cursor style
							>
								{month.name} {/* Display month name */}
							</div>
						))}
					</div>
				</main>
			</div>
		</>
	);
};

export default Reports;
