const TestModal = ({
	message,
	content,
	memberName,
	guarantor,
	numberOfBody,
	amount,
	onCancel,
	onConfirm,
}) => {
	return (
		<div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white w-auto min-w-96 p-10 rounded-md b-font">
				<div className="text-lg font-semibold py-5">
					{message && (
						<h2 className="text-xl text-center font-bold mb-4">{message}</h2>
					)}
					{content && <p className="text-center font-semibold">{content}</p>}
					{memberName && <p>Member name: {memberName} </p>}
					{guarantor && <p>Gurantor name: {guarantor}</p>}
					{numberOfBody && <p>No. of Body: {numberOfBody}</p>}
					{amount && <p>Amount:P {amount}</p>}
				</div>
				<div className="flex justify-between">
					{/* */}

					{onCancel && (
						<button
							onClick={onCancel}
							className="text-lg warning-button hover:warning-button-hover"
						>
							Cancel
						</button>
					)}
					{onConfirm && (
						<button
							onClick={onConfirm}
							className="text-lg paid-button hover:paid-button-hover"
						>
							Proceed
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default TestModal;
