"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import Loader from "../components/Loader/Loader";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
const Reports = () => {
	// ! [put before return] PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
	const { user } = useContext(AuthContext);
	if (user === null) {
		return <Loader />; // ! put loading animation
	}
	if (!user) {
		return null;
	}
	// TODO: END
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="content">
				<div className="flex justify-between items-center pb-10">
					<h1 className="f-heading">Reports</h1>
				</div>
				<Separator />
			</div>
		</>
	);
};

export default Reports;
