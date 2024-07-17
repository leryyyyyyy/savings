'use client';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Total from '../components/Total';
import CurrentDate from '../components/CurrentDate';
import Sidebar from '../components/Sidebar';
import Separator from '../components/Separator';
// TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import { checkAuth } from '@/utils/authUtils';
// TODO: END
const Dashboard = () => {
	// TODO: PUT THIS TO USE THE CHECK USER STATE(IF LOGGED IN OR NOT)
	const { user, setUser } = useContext(AuthContext);
	const router = useRouter();
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		if (!authChecked) {
			checkAuth(setUser, setAuthChecked, router);
		}
	}, [authChecked, setUser, router]);

	if (!user) return null;
	// TODO: END
	return (
		<>
			<Navbar />
			<Sidebar />
			<div className='ml-64 flex-1 p-10'>
				<div className='flex justify-between items-center pb-10 '>
					<Total />
					<CurrentDate />
				</div>
				<Separator />
				<div className='flex justify-between items-center h-40 space-x-20 f-dash'>
					<div className='bg-pink-50 text-pink-500 text-2xl border-2 border-pink-500 capitalize rounded-lg flex items-center justify-center flex-1 h-full transition-all duration-300 ease-in-out  hover:bg-pink-500 hover:text-pink-50 hover:scale-105 hover:shadow-lg cursor-pointer'>
						<p> members</p>
					</div>
					<div className='bg-pink-50 text-pink-500 text-2xl border-2 border-pink-500 capitalize rounded-lg flex items-center justify-center flex-1 h-full transition-all duration-300 ease-in-out  hover:bg-pink-500 hover:text-pink-50 hover:scale-105 hover:shadow-lg cursor-pointer'>
						<p> deposit for this week</p>
					</div>
					<div className='bg-pink-50 text-pink-500 text-2xl border-2 border-pink-500 capitalize rounded-lg flex items-center justify-center flex-1 h-full transition-all duration-300 ease-in-out  hover:bg-pink-500 hover:text-pink-50 hover:scale-105 hover:shadow-lg cursor-pointer'>
						<p> reports</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
