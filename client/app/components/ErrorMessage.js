const ErrorMessage = ({ errorMessage, totalAmount }) => {
	return (
		<p className="font-normal text-base absolute top-12 left-0 text-red-600 w-96">
			{errorMessage && <span>{errorMessage}</span>}
			{totalAmount && <span> P {totalAmount.toLocaleString()}</span>}
		</p>
	);
};

export default ErrorMessage;
