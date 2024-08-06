"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Total from "../components/Total";
import CurrentDate from "../components/CurrentDate";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import Loader from "../components/Loader/Loader.js";
import MemberCount from "../components/MemberCount";

// TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
// TODO: END
const Dashboard = () => {
	// TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
	const { user } = useContext(AuthContext);
	if (user === null) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader />
			</div>
		); // ! put loading animation
	}
	if (!user) {
		return null;
	}
	// TODO: END

	//* For dashboard navigation
	const router = useRouter();

	const members = () => {
		router.push("/members");
	};

	const deposit = () => {
		router.push("/deposit");
	};

	const reports = () => {
		router.push("/reports");
	};
	const loan = () => {
		router.push("/loan");
	};
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="content h-screen">
				<section className="flex justify-between items-center mb-7 ">
					<div className="space-y-3">
						<Total />
						<MemberCount />
					</div>
					<CurrentDate />
				</section>
				<Separator />
				<main className="flex justify-between items-center space-x-20 f-dash ">
					<div
						onClick={members}
						className="dash-nav py-20 text-2xl font-bold flex items-center justify-center flex-1 h-full  hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
					>
						<p> members</p>
					</div>
					<div
						onClick={deposit}
						className="dash-nav py-20 text-2xl font-bold flex items-center justify-center flex-1 h-full hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
					>
						<p>Deposit for this week</p>
					</div>
					<div
						onClick={loan}
						className="dash-nav py-20 text-2xl font-bold flex items-center justify-center flex-1 h-full  hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
					>
						<p> loan</p>
					</div>
					<div
						onClick={reports}
						className="dash-nav py-20 text-2xl font-bold flex items-center justify-center flex-1 h-full  hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
					>
						<p> reports</p>
					</div>
				</main>
			</div>
		</>
	);
};

export default Dashboard;
