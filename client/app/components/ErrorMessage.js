const ErrorMessage = ({ errorMessage }) => {
	return (
		<p className="font-normal text-sm absolute top-12 left-0 text-red-600 w-96">
			{errorMessage && <span>*{errorMessage}</span>}
		</p>
	);
};

export default ErrorMessage;
