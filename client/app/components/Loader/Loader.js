import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
	return (
		<>
			<div className="flex justify-center items-center flex-col h-screen">
				<div className={styles.loader}></div>
				<p className="text-xl text-pink-500 font-semibold ">Loading...</p>
			</div>
		</>
	);
};

export default Loader;
