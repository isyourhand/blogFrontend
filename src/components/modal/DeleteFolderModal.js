import { useContext, useState } from "react";
import "./css/DeleteFolderModal.css";
import GlobalStateContext from "../../store/global-context";
import AlertModal from "./AlertModal";

function DeleteFolderModal(props) {
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("error");

  const closeModal = props.closeDeleteModal;
  const id = props.id;

  const GlobalStateCtx = useContext(GlobalStateContext);

  const hostName = GlobalStateCtx.hostName;
  const lan = GlobalStateCtx.language;
  const changeReRender = GlobalStateCtx.changeReRender;

  const openAlertModal = () => {
    setAlert(true);
  };

  const closeAlertModal = () => {
    setAlert(false);
  };

  async function deleteDir() {
    try {
      const res = await fetch(`${hostName}/${lan}/api/dir/${id}`, {
        method: "DELETE",

        credentials: "include",
      });

      if (res.status === 204) {
        changeReRender("createSubFolder");
      }

      console.log(123);
      if (res.status === 500) {
        const res_ = await res.json();
        setMsg(res_.message);
        openAlertModal();
      } else {
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <p className="close">Are you sure you want to delete?</p>
        <button
          style={{ backgroundColor: "#fd424b" }}
          className="delete-button"
          onClick={deleteDir}
        >
          Confirm Delete
        </button>
        <button className="delete-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
      {alert ? <AlertModal closeModal={closeAlertModal} msg={msg} /> : ""}
    </div>
  );
}

export default DeleteFolderModal;
