"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Separator from "../components/Separator";
import Total from "../components/Total";
import CurrentDate from "../components/CurrentDate";

const loan = () => {
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className="content h-screen">
				<section className="flex justify-between items-center pb-10">
					<Total />
					<CurrentDate />
				</section>
				<Separator />
				<h1 className="f-heading pb-8">Loan</h1>
				<main className="b-font font-semibold  p-12 border-2 border-sky-500 bg-sky-50 rounded-md">
					<section className="flex justify-between space-x-4 text-2xl pb-10">
						<div className="flex items-center space-x-5">
							<h3 className="flex-shrink-0">Borrower name: </h3>
							<select
								name="member"
								id=""
								required
								className="border-2 border-gray-800 rounded-md w-56 text-xl p-1 flex-grow"
							>
								<option value="none">hELLO</option>
							</select>
						</div>
						<div className="flex items-center space-x-5 ">
							<h3 className="flex-shrink-0">Guarrantor name:</h3>
							{/*//TODO: member name shouldn't show when already selected as borrower*/}
							<select
								name="member"
								id=""
								required
								className="border-2 border-gray-800 rounded-md w-56 text-xl p-1 flex-grow"
							>
								<option value="none">Hello</option>
							</select>
						</div>
						<div className="flex items-center space-x-5 ">
							<h3>Amount:</h3>
							<input
								required
								type="text"
								className="border-2 border-gray-800 rounded-md w-56 text-xl p-1 flex-grow"
								placeholder="Enter amount"
							/>
							{/*//TODO:  Add an error message under if amount is not specified,
							//TODO:  also add a dynamic error message if entered amount exceeds
							//TODO:  total amount. */}
						</div>
					</section>
					<Separator />
					<section>
						<h3 className="text-2xl font-semibold pb-2">Summary:</h3>
						<div className="text-xl">
							<h4>Member name:</h4>
							<h4>Guarantor: </h4>
							<h4>Amount: </h4>
							<h4>Date:</h4>
						</div>
					</section>
				</main>
				<div className="flex justify-end">
					<button
						// onClick={handleSave}
						className="primary-button hover:primary-button-hover mt-10"
					>
						Save
					</button>
					{/* //TODO: On save add a modal confirmation. */}
					{/* //TODO: Place real-time summary under selections */}
				</div>
			</div>
		</>
	);
};

export default loan;
