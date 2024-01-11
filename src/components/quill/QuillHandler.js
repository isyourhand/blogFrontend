import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import ImgResizeModal from "../modal/ImgResizeModal";

import "react-quill/dist/quill.snow.css";

import "./css/quillHandler.css";

// Quill.register("modules/imageResize", ImageResize);

function QuillHandler(props) {
  const getValue = props.getValue;
  const lan = props.lan;

  const quillRef = useRef(null);

  const [value, setValue] = useState("");

  const [selectImg, setSelectImg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  function openModalHandler() {
    setOpenModal(true);
  }
  function closeModalHandler() {
    setOpenModal(false);
  }

  function resizeImg(img, height, width) {
    // resizeImg
    console.log(img, height, width);
    img.setAttribute("style", `width: ${width}px; height: ${height}px;`);
  }

  const handleContentChange = (value) => {
    const editor = quillRef.current.getEditor();

    console.log(value);

    if (editor.root.querySelector("img")) {
      const imgs = editor.root.querySelectorAll("img");

      imgs.forEach((img) => {
        img.addEventListener("click", () => {
          console.log(1);
          openModalHandler();

          setSelectImg(img);
        });
      });
    }

    setValue(value);
    getValue(value, lan);
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        style={{ height: "370px" }}
        theme="snow"
        placeholder="Compose here..."
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ color: [] }, { background: [] }], // 文本颜色和背景颜色
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ size: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
        value={value}
        onChange={handleContentChange}
      />
      {openModal ? (
        <ImgResizeModal
          img={selectImg}
          closeModalHandler={closeModalHandler}
          resizeImg={resizeImg}
          close={closeModalHandler}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default QuillHandler;
