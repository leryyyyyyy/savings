"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import CurrentDate from "../components/CurrentDate";
import Loader from "../components/Loader/Loader";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

const MonthList = () => {
	const [months, setMonths] = useState([]);

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

	const { user } = useContext(AuthContext);
	if (user === null) {
		return <Loader />;
	}
	if (!user) {
		return null;
	}

	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="content h-screen">
				<section className="flex justify-between items-center pb-10">
					<h1 className="f-heading">Reports</h1>
					<CurrentDate />
				</section>
				<Separator />

				<main>
					<div className="space-y-12">
						<div className="grid grid-cols-3 gap-12">
							{months.map((month) => (
								<div
									key={month.id}
									className="reports-default hover:reports-default-hover hover:scale-105 hover:shadow-lg "
								>
									{month.name}
								</div>
							))}
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default MonthList;
