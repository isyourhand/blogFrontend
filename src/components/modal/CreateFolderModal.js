import { useContext, useRef, useState } from "react";
import "./css/CreateFolderModal.css";
import GlobalStateContext from "../../store/global-context";
import AlertModal from "./AlertModal";

function CreateFolderModal(props) {
  const folderNameRef = useRef();

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("error");

  const h2Text = props.text;
  const id = props.id;
  const closeModal = props.closeInputModal;

  console.log(id);

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

  const createSubFolder = async () => {
    try {
      const name = folderNameRef.current.value;
      console.log(name);
      const res = await fetch(`${hostName}/${lan}/api/dir/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      });

      const res_ = await res.json();

      if (res_.status === "error") {
        setMsg(res_.message);
        openAlertModal();
      } else {
        changeReRender("createSubFolder");
        closeModal();
      }

      console.log(res_);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overlay">
      <form
        className="dialog"
        onSubmit={(e) => {
          e.preventDefault();
          createSubFolder();
        }}
      >
        <h2>{h2Text}</h2>
        <label className="MenuLabel" htmlFor="inputText">
          请输入信息：
        </label>
        <input
          className="MenuInput"
          type="text"
          id="inputText"
          placeholder="在这里输入..."
          required
          ref={folderNameRef}
        />
        <div className="button-container">
          <button
            className="MenuButton"
            onClick={(e) => {
              closeModal();
            }}
          >
            取消
          </button>
          <button className="MenuButton" type="submit">
            确定
          </button>
        </div>
      </form>
      {alert ? <AlertModal closeModal={closeAlertModal} msg={msg} /> : ""}
    </div>
  );
}

export default CreateFolderModal;
