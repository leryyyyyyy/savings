import Button from "./Button";

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
          {guarantor && <p>Gurantor name: {guarantor ? guarantor : "none"}</p>}
          {numberOfBody && <p>No. of Body: {numberOfBody}</p>}
          <p>Amount:P {amount.toLocaleString()}</p>
        </div>
        <div className="flex justify-between">
          <Button onClick={onCancel} className="text-lg" variant="warning">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="text-lg" variant="paid">
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
