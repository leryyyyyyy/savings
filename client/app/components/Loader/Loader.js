import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<div className={styles.loader}></div>
				<p className="text-xl text-sky-600 font-semibold ">Loading...</p>
			</div>
		</>
	);
};

export default Loader;
