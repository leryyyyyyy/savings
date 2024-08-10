"use client";
import React from "react";
import Navbar from "../components/Navbar";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
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

	const pathname = usePathname();
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
				<main>
					<nav className="flex flex-1 flex-wrap justify-between items-center space-x-20 f-dash ">
						<a
							href="/members"
							className="dash-nav py-20 text-2xl font-bold h-full flex-1 hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
						>
							<p> members</p>
						</a>
						<a
							href="/deposit"
							className="dash-nav py-20 text-2xl font-bold h-full flex-1 hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
						>
							<p>Deposit for this week</p>
						</a>
						<a
							href="/loan"
							className="dash-nav py-20 text-2xl font-bold h-full flex-1 hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
						>
							<p> loan</p>
						</a>
						<a
							href="reports"
							className="dash-nav py-20 text-2xl font-bold h-full flex-1 hover:dash-nav-hover hover:scale-105 hover:shadow-lg"
						>
							<p> reports</p>
						</a>
					</nav>
				</main>
			</div>
		</>
	);
};

export default Dashboard;
