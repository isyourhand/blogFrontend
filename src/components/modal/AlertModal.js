import "./css/AlertModal.css";

function AlertModal(props) {
  const msg = props.msg;
  const closeModal = props.closeModal;

  return (
    <div className="alertOverlay">
      <div className="alertDialog">
        <div className="AlertLabel">{msg}</div>

        <button className="AlertButton" onClick={closeModal}>
          确定
        </button>
      </div>
    </div>
  );
}

export default AlertModal;
