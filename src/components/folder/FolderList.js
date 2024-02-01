import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

import "./css/FolderItem.css";
import downArrow from "./img/downArrow.png";
import upArrow from "./img/upArrow.png";
import { useEffect, useState, memo, useContext, useRef } from "react";
import ContextMenuModal from "../modal/ContextMenuModal";
import CreateFolderModal from "../modal/CreateFolderModal";
import DeleteFolderModal from "../modal/DeleteFolderModal";
import GlobalStateContext from "../../store/global-context";

function FolderList(props) {
  const folderRef = useRef();

  const [isClicked, setIsClicked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputModal, setInputModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const name = props.name;
  const folderChildren = props.folderChildren;
  const fileChildren = props.fileChildren;
  const depth = props.depth;
  const getPostData = props.getPostData;
  const id = props.id;
  const createdAt = props.createdAt;
  const parentColor = props.parentColor;

  // console.log(
  //   name,
  //   "->",
  //   parseInt(Date.now() / 1000, 10) -
  //     parseInt(new Date(createdAt).getTime() / 1000, 10),
  //   new Date(Date.now()).toLocaleString(),
  //   "->",
  //   new Date(createdAt).toLocaleString()
  // );

  const GlobalStateCtx = useContext(GlobalStateContext);
  const reRender = GlobalStateCtx.reRender;

  const handleContextMenu = (event) => {
    event.preventDefault(); // 阻止默认右键菜单

    // 获取鼠标点击位置的坐标
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    setMenuPosition({ left: mouseX, top: mouseY });
    // 在这里可以执行你的自定义右键命令逻辑

    setMenuVisible(true);
    console.log(`Custom context menu at (${mouseX}, ${mouseY})`);
  };

  const handleGlobalClick = () => {
    // 点击页面其他地方时，隐藏右键菜单
    setMenuVisible(false);
  };

  const openInputModal = () => {
    setInputModal(true);
  };

  const closeInputModal = () => {
    setInputModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    if (menuVisible) {
      window.addEventListener("click", handleGlobalClick);

      return () => {
        window.removeEventListener("click", handleGlobalClick);
      };
    }
  }, [menuVisible]);

  function toggleDisplay(e) {
    e.preventDefault();

    setBackgroundColor(isClicked ? "" : "#4bbb7d");
    setTextColor(isClicked ? "black" : "white");
    setIsClicked(isClicked ? false : true);

    const childs = e.target.closest(".folder").children;

    console.log(1, childs);
    for (let i = 1; i < childs.length; i++) {
      console.log(2, childs[i]);
      childs[i].hidden = !childs[i].hidden;
    }
  }
  // console.log(
  //   name,
  //   folderRef.current
  //     ? window.getComputedStyle(folderRef.current).backgroundColor
  //     : "",
  //   depth
  // );

  const color = folderRef.current
    ? window.getComputedStyle(folderRef.current).backgroundColor
    : "";

  return (
    <section
      className={"folder"}
      hidden={
        (parseInt(Date.now() / 1000, 10) -
          parseInt(new Date(createdAt).getTime() / 1000, 10) <
          5 &&
          parentColor === "rgb(75, 187, 125)") ||
        depth <= 1
          ? false
          : true
      }
    >
      {depth > 0 ? (
        <Link
          style={{
            backgroundColor: backgroundColor,
            color: textColor,
            minWidth: "150px",
          }}
          to="/"
          onClick={toggleDisplay}
          onContextMenu={handleContextMenu}
          ref={folderRef}
        >
          {name}
          <img src={isClicked ? upArrow : downArrow} alt="arrow" />
        </Link>
      ) : (
        ""
      )}

      {menuVisible ? (
        <ContextMenuModal
          menuPosition={menuPosition}
          id={id}
          handleNewFolderClick={openInputModal}
          openDeleteModal={openDeleteModal}
        />
      ) : (
        ""
      )}

      {inputModal ? (
        <CreateFolderModal
          id={id}
          text={"文件夹命名"}
          closeInputModal={closeInputModal}
        />
      ) : (
        ""
      )}

      {deleteModal ? (
        <DeleteFolderModal id={id} closeDeleteModal={closeDeleteModal} />
      ) : (
        ""
      )}

      {/* <FolderItem /> */}
      {folderChildren &&
        folderChildren.map((child, i) => {
          return (
            <FolderList
              id={child.id}
              key={i}
              createdAt={child.createdAt}
              name={child.name}
              folderChildren={child.subfolder}
              fileChildren={child.subfile}
              depth={depth + 1}
              getPostData={getPostData}
              parentColor={color}
            />
          );
        })}
      {fileChildren.map((file, i) => (
        <section className="file" key={i} hidden={depth > 0 ? true : false}>
          {/* {console.log(file)} */}
          <Link
            to={`/`}
            onClick={(e) => {
              e.preventDefault();
              getPostData(file.keyName);
            }}
          >
            {file.title.length > 12
              ? `${file.title.slice(0, 30)}...`
              : file.title.slice(0, 30)}
          </Link>
        </section>
      ))}
    </section>
  );
}

// folderChildren={child.subfolder}
// fileChildren={child.subfile}

export default FolderList;
