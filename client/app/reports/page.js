"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import CurrentDate from "../components/CurrentDate";
import Loader from "../components/Loader/Loader";
import WeeklyView from "../components/WeeklyView";
import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";

const Reports = () => {
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
			<div className="content h-screen pt-20">
				<section className="flex justify-between items-center pb-10">
					<h1 className="f-heading">Reports</h1>
					<CurrentDate />
				</section>
				<Separator />
				<main>
					<WeeklyView />
				</main>
			</div>
		</>
	);
};

export default Reports;
