const { Rubik, Assistant, Allura } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				nav: [Allura],
				headings: [Rubik],
				body: [Assistant],
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.bg-light': {
					//! bg-color for page
					backgroundColor: '#fdf2f8',
				},
				'.bg-dark': {
					//! bg-color for table headers, etc.
					backgroundColor: '#be185d',
				},
				'.f-nav': {
					fontFamily: 'Allura',
					fontWeight: '400',
					fontSize: '50px', //! changed 48px to 32px
					color: '#fdf2f8 ', //! added text-color
				},
				'.f-heading': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '32px', //! changed 48px to 32px
					color: '#fdf2f8 ', //! added text-color
				},
				'.f-subheading': {
					fontFamily: 'Rubik',
					fontWeight: '500',
					fontSize: '24px', //? changed 30px to 24px
					color: '#111827  ', //? added text-color
				},
				'.f-dash': {
					fontFamily: 'Rubik',
					fontWeight: '500',
				},
				'.f-body': {
					fontFamily: 'Assistant',
					fontWeight: '400',
					fontSize: '18px',
					color: '#111827  ', //? added text-color
				},
				'.primary-button': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#f472b6',
					color: '#fdf2f8 ',
					borderRadius: '9px',
					padding: '8px 15px',
				},
				'.primary-button-hover': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#f9a8d4 ',
					color: '#be185d ',
					borderRadius: '9px',
					padding: '8px 15px',
				},
				'.paid-button': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#22c55e',
					color: '#f3f4f6',
					borderRadius: '9px',
					padding: '8px 15px',
				},
				'.paid-button-hover': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#86efac',
					color: '#111827',
					borderRadius: '9px',
					padding: '8px 15px',
				},
				'.delayed-button': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#f97316',
					color: '#f3f4f6',
					borderRadius: '9px',
					padding: '8px 15px',
				},
				'.delayed-button-hover': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#fdba74',
					color: '#111827',
					borderRadius: '9px',
					padding: '8px 15px',
				},
				'.warning-button': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#ef4444',
					color: '#f3f4f6',
					borderRadius: '9px',
					padding: '8px 15px',
				},
				'.warning-button-hover': {
					fontFamily: 'Rubik',
					fontWeight: '600',
					fontSize: '18px',
					backgroundColor: '#fca5a5',
					color: '#111827',
					borderRadius: '9px',
					padding: '8px 15px',
				},
			});
		},
	],
};
