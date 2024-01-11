import { useState, useContext } from "react";

import "./css/Overview.css";
import "react-quill/dist/quill.bubble.css";

import FolderList from "../components/folder/FolderList";
import ReactQuill from "react-quill";

import GlobalStateContext from "../store/global-context";

import editImg from "./img/edit.png";
import AuthStateContext from "../store/auth-context";

function Overview() {
  const [editable, setEditable] = useState(false);
  const [newContent, setNewContent] = useState("");

  const GlobalStateCtx = useContext(GlobalStateContext);
  const lan = GlobalStateCtx.language;
  const dir = lan === "cn" ? GlobalStateCtx.folder : GlobalStateCtx.folderEn;
  const postDetail = GlobalStateCtx.post[lan];

  const AuthStateCtx = useContext(AuthStateContext);
  const role = AuthStateCtx.role;

  console.log("env1", process.env);

  console.log("dir ->", dir);
  function getPostData(keyName) {
    GlobalStateCtx.changePost(keyName);
  }

  function editableHandeler() {
    console.log("setEditable...", editable);
    setEditable((preEditable) => {
      return !preEditable;
    });
  }

  const handleContentChange = (value) => {
    console.log(value);
    console.log("postDetail", postDetail);
    if (editable) {
      postDetail.content = value;
      setNewContent(value);
    }
  };

  async function updatePostContent() {
    try {
      console.log(newContent);
      const doc = await fetch(
        `http://127.0.0.1:4000/${lan}/api/post/${postDetail._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content: newContent }),
        }
      );

      console.log(doc);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="Background">
      <section className="sidercontent">
        {dir.length !== 0 ? (
          <FolderList
            name={dir.name}
            folderChildren={dir.subfolder}
            fileChildren={dir.subfile}
            depth={0}
            getPostData={getPostData}
          />
        ) : (
          ""
        )}
      </section>
      <section className="postContent">
        {role === "admin" ? (
          <button className="updateButton" onClick={editableHandeler}>
            <img
              src={editImg}
              alt="edit"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
        ) : (
          ""
        )}

        {!postDetail ? (
          <div>
            <div
              style={{
                textAlign: "center",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              欢迎来到我的博客
            </div>
            <div style={{ textAlign: "center", fontSize: "16px" }}>
              看到左上角那个小头像了吗？点击可获取随机
              ‘建议’，也许挺有意思的，多点点？🤔
            </div>
          </div>
        ) : (
          <div>
            {postDetail.title !== "Welcome" && postDetail.title !== "欢迎" ? (
              <div className="postTitle">{postDetail.title} </div>
            ) : (
              ""
            )}

            {postDetail.title !== "Welcome" && postDetail.title !== "欢迎" ? (
              <div className="postcreatedAt">
                {new Date(postDetail.createdAt).toLocaleString()}
              </div>
            ) : (
              ""
            )}

            <div className="quillContent">
              <ReactQuill
                style={{ height: "100%" }}
                value={postDetail.content}
                readOnly={!editable}
                theme="bubble"
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
                onChange={handleContentChange}
              ></ReactQuill>
              {editable ? (
                <button
                  style={{ margin: "20px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    updatePostContent();
                  }}
                >
                  确认更新
                </button>
              ) : (
                ""
              )}

              {/* <div
            dangerouslySetInnerHTML={{
              __html: postLoaded ? postDetail.content : "",
            }}
          /> */}
            </div>
          </div>
        )}
      </section>
    </section>
  );
}

export default Overview;
