"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Navbar = () => {
	const { logout, setUser } = useContext(AuthContext);
	const router = useRouter();
	const [logoutLoading, setLogoutLoading] = useState(false);

	const handleLogout = async () => {
		setLogoutLoading(true);
		try {
			await logout();
			setUser(null);
			router.push("/login");
		} catch (err) {
			console.error("Logout error:", err);
		} finally {
			setLogoutLoading(false);
		}
	};

	return (
		<nav className="flex justify-between items-center p-3 bg-dark fixed top-0 left-0 right-0 h-16 z-50">
			<h1 className="flex-grow text-start justify-center items-center text-sky-50 f-heading">
				Family Savings
			</h1>
			<button
				onClick={handleLogout}
				disabled={logoutLoading}
				className="primary-button hover:primary-button-hover ml-auto text-gray-100"
			>
				{logoutLoading ? "Logging out............." : "Logout"}
			</button>
		</nav>
	);
};

export default Navbar;
