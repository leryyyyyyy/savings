const { Rubik, Assistant } = require("next/font/google");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				headings: "Rubik",
				body: "Assistant",
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".bg-light": {
					//! bg-color for page
					backgroundColor: "#7dd3fc",
				},
				".bg-dark": {
					//! bg-color for table headers, etc.
					backgroundColor: "#0284c7",
				},
				".f-heading": {
					fontFamily: "Rubik",
					fontWeight: "600",
					fontSize: "28px", //! changed font size
					//removed text color
				},
				".f-subheading": {
					fontFamily: "Rubik",
					fontWeight: "500",
					fontSize: "20px", //! changed font size
					//removed text color
				},
				".b-font": {
					fontFamily: "Assistant",
				},
				".f-body": {
					fontFamily: "Assistant",
					fontWeight: "400",
					fontSize: "16px", //! changed font size
					color: "#111827  ", //? added text-color
				},
				".f-dash": {
					//? added f-dash on divs in dashboard
					fontFamily: "Rubik",
					fontWeight: "500",
				},
				".dash-nav": {
					//!modified dashnav config
					backgroundColor: "#f0f9ff",
					color: "#0284c7",
					border: "2px solid #0284c7",
					borderRadius: "9px",
					fontWeight: "500",
					textTransform: "capitalize",
					cursor: "pointer",
					transition: "all 0.3s ease-in-out",
					textAlign: "center",
				},
				".dash-nav-hover": {
					backgroundColor: "#0284c7",
					color: "#f0f9ff",
				},
				".primary-button": {
					fontFamily: "Rubik",
					fontWeight: "600",
					fontSize: "18px",
					backgroundColor: "#0ea5e9", //! changed color
					color: "#e0f2fe ", //! changed color
					borderRadius: "9px",
					padding: "8px 15px",
					transition: "all 0.3s ease-in-out",
				},
				".primary-button-hover": {
					backgroundColor: "#e0f2fe ", //! changed color
					color: "#0ea5e9 ", //! changed color
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
				},
				".paid-button": {
					fontFamily: "Rubik",
					fontWeight: "600",
					fontSize: "18px",
					backgroundColor: "#10b981", //! changed color
					color: "#d1fae5", //! changed color
					borderRadius: "9px",
					padding: "8px 15px",
					transition: "all 0.3s ease-in-out",
				},
				".paid-button-hover": {
					backgroundColor: "#d1fae5", //! changed color
					color: "#10b981", //! changed color
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
				},
				".delayed-button": {
					fontFamily: "Rubik",
					fontWeight: "600",
					fontSize: "18px",
					backgroundColor: "#f97316", //! changed color
					color: "#ffedd5", //! changed color
					transition: "all 0.3s ease-in-out",
				},
				".delayed-button-hover": {
					backgroundColor: "#ffedd5", //! changed color
					color: "#f97316", //! changed color
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
				},
				".warning-button": {
					fontFamily: "Rubik",
					fontWeight: "600",
					fontSize: "18px",
					backgroundColor: "#ef4444", //! changed color
					color: "#fee2e2", //! changed color
					borderRadius: "9px",
					padding: "8px 15px",
					transition: "all 0.3s ease-in-out",
				},
				".warning-button-hover": {
					backgroundColor: "#fee2e2", //! changed color
					color: "#ef4444", //! changed color
					boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
				},
			});
		},
	],
};
