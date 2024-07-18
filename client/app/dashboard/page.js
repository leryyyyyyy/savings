"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Total from "../components/Total";
import CurrentDate from "../components/CurrentDate";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
// TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
// TODO: END
const Dashboard = () => {
	// TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
	const { user } = useContext(AuthContext);
	if (user === null) {
		return <div class="h-screen flex items-center justify-center">Loading</div>; // TODO: put loading animation
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
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="ml-64 flex-1 p-10">
				<div className="flex justify-between items-center pb-10 ">
					<Total />
					<CurrentDate />
				</div>
				<Separator />
				<div className="flex justify-between items-center h-40 space-x-20 f-dash">
					<div
						onClick={members}
						className="bg-pink-50 text-pink-500 text-2xl border-2 border-pink-500 capitalize rounded-lg flex items-center justify-center flex-1 h-full transition-all duration-300 ease-in-out  hover:bg-pink-500 hover:text-pink-50 hover:scale-105 hover:shadow-lg cursor-pointer"
					>
						<p> members</p>
					</div>
					<div
						onClick={deposit}
						className="bg-pink-50 text-pink-500 text-2xl border-2 border-pink-500 capitalize rounded-lg flex items-center justify-center flex-1 h-full transition-all duration-300 ease-in-out hover:bg-pink-500 hover:text-pink-50 hover:scale-105 hover:shadow-lg cursor-pointer"
					>
						<p>Deposit for this week</p>
					</div>
					<div
						onClick={reports}
						className="bg-pink-50 text-pink-500 text-2xl border-2 border-pink-500 capitalize rounded-lg flex items-center justify-center flex-1 h-full transition-all duration-300 ease-in-out  hover:bg-pink-500 hover:text-pink-50 hover:scale-105 hover:shadow-lg cursor-pointer"
					>
						<p> reports</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
