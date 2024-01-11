import { Link } from "react-router-dom";

import "./css/FolderItem.css";
import downArrow from "./img/downArrow.png";
import upArrow from "./img/upArrow.png";
import { useState } from "react";

function FolderList(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("black");

  const name = props.name;
  const folderChildren = props.folderChildren;
  const fileChildren = props.fileChildren;
  const depth = props.depth;
  const getPostData = props.getPostData;

  function toggleDisplay(e) {
    e.preventDefault();

    setBackgroundColor(isClicked ? "" : "#4bbb7d");
    setTextColor(isClicked ? "black" : "white");
    setIsClicked(isClicked ? false : true);

    // onFocus(arrow);
    // console.log(1, e.target.firstElementChild.textContent);
    // console.log(2, e.target.children);
    // e.target.firstElementChild.textContent = "";
    const childs = e.target.closest(".folder").children;

    console.log(1, childs);
    for (let i = 1; i < childs.length; i++) {
      console.log(2, childs[i]);
      // childs[i].setAttribute("class", "dismiss");
      childs[i].hidden = !childs[i].hidden;
      //childs[i].hidden = childs[i].hidden === true ? false : true;
    }
  }

  return (
    <section className={"folder"} hidden={depth > 1 ? true : false}>
      {depth > 0 ? (
        <Link
          style={{ backgroundColor: backgroundColor, color: textColor }}
          to="/"
          onClick={toggleDisplay}
        >
          {name}
          <img src={isClicked ? upArrow : downArrow} alt="arrow" />
        </Link>
      ) : (
        ""
      )}

      {/* <FolderItem /> */}
      {folderChildren &&
        folderChildren.map((child, i) => {
          return (
            <FolderList
              key={i}
              name={child.name}
              folderChildren={child.subfolder}
              fileChildren={child.subfile}
              depth={depth + 1}
              getPostData={getPostData}
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
            {file.title.slice(0, 10)}
          </Link>
        </section>
      ))}
    </section>
  );
}

// folderChildren={child.subfolder}
// fileChildren={child.subfile}

export default FolderList;
