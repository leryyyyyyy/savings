'use client';
// import { useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AuthContext from '../../context/AuthContext';
// import axios from 'axios';
import Navbar from '../components/Navbar';
import Total from '../components/Total';
import CurrentDate from '../components/CurrentDate';

const Dashboard = () => {
	return (
		<>
			<Navbar />

			<div className='flex justify-between items-center p-4'>
				<Total /> <CurrentDate />
			</div>
		</>
	);
};

export default Dashboard;
