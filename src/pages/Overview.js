import { useState, useContext, useRef } from "react";

import "./css/Overview.css";
import "react-quill/dist/quill.bubble.css";

import FolderList from "../components/folder/FolderList";
import ReactQuill from "react-quill";

import GlobalStateContext from "../store/global-context";

import editImg from "./img/edit.png";
import AuthStateContext from "../store/auth-context";
import MarkdownFactory from "../components/markdown/MarkdownFactory";

function Overview() {
  const siderRef = useRef();

  const [editable, setEditable] = useState(false);

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

  async function updatePostContent() {
    try {
      const doc = await fetch(
        `http://127.0.0.1:4000/${lan}/api/post/${postDetail._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content: postDetail.content }),
        }
      );

      console.log(doc);
    } catch (err) {
      console.error(err);
    }
  }

  const handleInput = (e) => {
    console.log(e.target.innerText);
    postDetail.content = e.target.innerText;
  };

  const closeSider = () => {
    console.dir(siderRef.current.style);

    // var width = siderRef.current.style.width;
    // siderRef.current.style.width = width === "0px" ? "225px" : 0;

    const hidden = siderRef.current.hidden;
    siderRef.current.hidden = !hidden;
  };

  const Welcome_cn = `# 欢迎来到我的博客
  看到左上角那个小头像了吗？点击可获取随机*建议*，也许挺有意思的，多点点？🤔  
  &nbsp;  
  > **左侧目录介绍**
  
  **值得一看**：收藏我自己编写专门供人阅读的文章，会努力写得清晰明白。🤓  
  **个人收集**：我个人收集的新闻或文章，想必都是些好东西？                      
  **文档**：记录一切我觉得值得记录的东西，但对他人阅读不一定不友好。  

  &nbsp;  
  **右下角的绿色按钮可以切换语言，只支持中英文。（本人英语水平一般，主要靠 gpt 翻译。😢）**
  `;
  const Welcome_en = `# Welcome to my blog!  
  Have you noticed the small avatar in the top left corner? Click on it to get random "recommendations." It might be quite interesting. How about click it a bit more? 🤔
  
  &nbsp;  
  > **Left Sidebar Introduction**  
  
  ***GoodtoRead***：A collection of articles that I have personally written for people to enjoy.  
  ***SelfCollection***：News or articles that I have collected based on my personal interests.  
  ***Docs***：A repository for everything I find worth documenting, although they may not be reader-friendly.  

  &nbsp;  
  **The green button in the bottom right corner allows you to switch languages, supporting only Chinese and English. (My English proficiency is average, mainly relying on GPT for translation. 😢)**`;

  return (
    <section className="Background">
      <section className="sidercontent" ref={siderRef}>
        {dir.length !== 0 ? (
          <FolderList
            id={dir.id}
            name={dir.name}
            folderChildren={dir.subfolder}
            fileChildren={dir.subfile}
            createdAt={dir.createdAt}
            depth={0}
            getPostData={getPostData}
          />
        ) : (
          ""
        )}
      </section>
      <div className="close-open" onClick={closeSider}>
        {"|"}
      </div>
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
          <MarkdownFactory markdown={lan === "cn" ? Welcome_cn : Welcome_en} />
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

            <div>
              {editable ? (
                <div>
                  <div
                    className="updateArea"
                    contentEditable={true}
                    onInput={handleInput}
                  >
                    {postDetail.content}
                  </div>
                  <button
                    style={{ margin: "20px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      updatePostContent();
                    }}
                  >
                    确认更新
                  </button>
                </div>
              ) : (
                <MarkdownFactory markdown={postDetail.content} />
              )}
            </div>
            {/* <div className="quillContent">
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

            
            </div> */}
          </div>
        )}
      </section>
    </section>
  );
}

export default Overview;
