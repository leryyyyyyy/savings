import React, { useEffect, useState } from 'react';

const CurrentDate = () => {
	const [currentDate, setCurrentDate] = useState('');

	useEffect(() => {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Asia/Manila', // Set the timezone to Manila
		};

		const updateDate = () => {
			const date = new Intl.DateTimeFormat('en-PH', options).format(new Date());
			setCurrentDate(date);
		};

		updateDate();

		const interval = setInterval(updateDate, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<p className='f-subheading'>{currentDate}</p>
		</div>
	);
};

export default CurrentDate;
