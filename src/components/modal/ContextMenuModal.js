import { useContext, useState } from "react";
import "./css/ContextMenuModal.css";
import GlobalStateContext from "../../store/global-context";
import GenericModal from "./CreateFolderModal";

function ContextMenuModal(props) {
  const handleNewFolderClick = props.handleNewFolderClick;
  const openDeleteModal = props.openDeleteModal;

  const menuPosition = props.menuPosition;

  const handleMenuItemClick = () => {};

  return (
    <div>
      <div
        className="ContextMenuCard"
        style={{
          position: "absolute",
          left: menuPosition.left,
          top: menuPosition.top,
        }}
      >
        <div
          className="MenuOption"
          onClick={(e) => {
            handleNewFolderClick();
          }}
        >
          新建文件夹
        </div>
        <div
          className="MenuOption"
          onClick={() => handleMenuItemClick("Item 2")}
        >
          新建文件
        </div>
        <div className="MenuOption" onClick={() => openDeleteModal()}>
          删除
        </div>
      </div>
    </div>
  );
}

export default ContextMenuModal;
