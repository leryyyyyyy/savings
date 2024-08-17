const Modal = ({ message, content }) => {
	return (
		<div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white p-20 rounded-md text-center text-slate-900 ">
				<h2 className="text-xl font-bold mb-4">{message}</h2>
				<p className="text-center font-semibold">{content}</p>
			</div>
		</div>
	);
};
// Modal.propTypes = {
// 	message: PropTypes.string.isRequired,
// 	content: PropTypes.string.isRequired,
// };

export default Modal;
