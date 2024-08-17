const ConfirmationModal = ({
	message,
	memberName,
	guarantor,
	numberOfBody,
	amount,
	onCancel,
	onConfirm,
}) => {
	return (
		<div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white p-10 rounded-md b-font">
				<h2 className="text-2xl font-bold">{message}</h2>
				<div className="text-lg font-semibold py-5">
					<p>Member name: {memberName} </p>
					{guarantor && <p>Gurantor name: {guarantor}</p>}
					{numberOfBody && <p>No. of Body: {numberOfBody}</p>}
					<p>Amount:P {amount}</p>
				</div>
				<div className="flex justify-between">
					<button
						onClick={onCancel}
						className="text-lg warning-button hover:warning-button-hover"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="text-lg paid-button hover:paid-button-hover"
					>
						Proceed
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
