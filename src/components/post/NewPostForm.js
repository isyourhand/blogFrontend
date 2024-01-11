import { useRef, useState, useContext } from "react";
import "./css/NewPostForm.css";
import QuillHandler from "../quill/QuillHandler";
import NewPostFormFolder from "./NewPostForm_folder";
// import NewPostFormFolder from "./NewPostForm_folder";

function NewPostForm(props) {
  const titleInputRef = useRef();
  const topicInputRef = useRef();
  const secondTopicInputRef = useRef();
  const introductionInputRef = useRef();
  const keyNameRef = useRef();

  const titleInputEnRef = useRef();
  const topicInputEnRef = useRef();
  const secondTopicInputEnRef = useRef();
  const introductionInputEnRef = useRef();
  const keyNameEnRef = useRef();

  const [content_, setContent] = useState("");
  const [contentEn_, setContentEn] = useState("");

  const [selectedOption, setSelectedOption] = useState([
    "",
    "please choose one",
  ]);
  const [selectedOptionEn, setSelectedOptionEn] = useState([
    "",
    "please choose one",
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const name = props.name;
  const folder = props.folder;
  const depth = props.depth;
  const _id = props._id;

  const nameEn = props.nameEn;
  const folderEn = props.folderEn;
  const depthEn = props.depthEn;
  const _idEn = props._idEn;

  function submitHandler(event, lan) {
    event.preventDefault();

    let title, topic, secondTopic, introduction, keyName, content;

    if (lan === "cn") {
      title = titleInputRef.current.value;
      topic = topicInputRef.current.value;
      secondTopic = secondTopicInputRef.current.value;
      introduction = introductionInputRef.current.value;
      keyName = keyNameRef.current.value;
      content = content_;
    } else {
      title = titleInputEnRef.current.value;
      topic = topicInputEnRef.current.value;
      secondTopic = secondTopicInputEnRef.current.value;
      introduction = introductionInputEnRef.current.value;
      keyName = keyNameEnRef.current.value;
      content = contentEn_;
    }

    const postData = {
      title,
      topic,
      secondTopic,
      introduction,
      keyName,
      content,
    };
    console.log(postData, selectedOption[0], selectedOptionEn[0]);

    if (lan === "cn")
      props.createPostHandler(postData, selectedOption[0], "cn");
    else props.createPostHandler(postData, selectedOptionEn[0], "en");
  }

  function getValue(value, lan) {
    lan === "cn" ? setContent(value) : setContentEn(value);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
  };

  const getFolderIdAndName = (id, name, lan) => {
    console.log("here is id and name:", id, name, lan);
    lan === "cn"
      ? setSelectedOption([id, name])
      : setSelectedOptionEn([id, name]);
  };

  return (
    <section className="form__Layout">
      <form className="newPost__form" onSubmit={(e) => submitHandler(e, "cn")}>
        <div>
          <label className="newPost__label">Title</label>
          <input type="text" ref={titleInputRef} />
        </div>
        <div>
          <label className="newPost__label">Topic</label>
          <select ref={topicInputRef}>
            <option value="other">other</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
        <div>
          <label className="newPost__label">Second Topic</label>
          <select ref={secondTopicInputRef}>
            <option value="other">other</option>
            <option value="reactjs">reactjs</option>
            <option value="nodejs">nodejs</option>
            <option value="javascript">javascript</option>
            <option value="css">css</option>
            <option value="html">html</option>
            <option value="mongodb">mongodb</option>
            <option value="redis">redis</option>
          </select>
        </div>
        <div>
          <label className="newPost__label">Introduction</label>
          <input type="text" ref={introductionInputRef} />
        </div>

        <div>
          <label className="newPost__label">keyName</label>
          <input type="text" ref={keyNameRef} />
        </div>

        <div>
          <label className="newPost__label">Select Folder</label>

          <div className="custom-dropdown">
            <div className="selected-option" onClick={toggleDropdown}>
              {selectedOption[1]}
            </div>
            {isDropdownOpen ? (
              <div className="dropdown-options">
                <NewPostFormFolder
                  _id={_id}
                  name={name}
                  folders={folder.subfolder}
                  depth={depth}
                  getFolderIdAndName={getFolderIdAndName}
                  lan={"cn"}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div>
          <label className="newPost__label">content</label>
          <section className="quill">
            <QuillHandler getValue={getValue} lan={"cn"}></QuillHandler>
          </section>{" "}
        </div>
        <div>
          <button type="submit" className="newPost__button">
            Add Meetup
          </button>
        </div>
      </form>

      {
        // -----------------------------^_^---------------
      }

      <div
        style={{
          borderTop: "1px solid #5ec5763a",
          margin: "30px",
          width: "90%",
        }}
      ></div>

      {
        // -----------------------------^_^---------------
      }

      <form className="newPost__form" onSubmit={(e) => submitHandler(e, "en")}>
        <div>
          <label className="newPost__label">TitleEn</label>
          <input type="text" ref={titleInputEnRef} />
        </div>
        <div>
          <label className="newPost__label">TopicEn</label>
          <select ref={topicInputEnRef}>
            <option value="other">other</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
        <div>
          <label className="newPost__label">Second TopicEn</label>
          <select ref={secondTopicInputEnRef}>
            <option value="other">other</option>
            <option value="reactjs">reactjs</option>
            <option value="nodejs">nodejs</option>
            <option value="javascript">javascript</option>
            <option value="css">css</option>
            <option value="html">html</option>
            <option value="mongodb">mongodb</option>
            <option value="redis">redis</option>
          </select>
        </div>
        <div>
          <label className="newPost__label">IntroductionEn</label>
          <input type="text" ref={introductionInputEnRef} />
        </div>

        <div>
          <label className="newPost__label">keyName</label>
          <input type="text" ref={keyNameEnRef} />
        </div>

        <div>
          <label className="newPost__label">Select FolderEn</label>

          <div className="custom-dropdown">
            <div className="selected-option" onClick={toggleDropdown}>
              {selectedOptionEn[1]}
            </div>
            {isDropdownOpen ? (
              <div className="dropdown-options">
                <NewPostFormFolder
                  _id={_idEn}
                  name={nameEn}
                  folders={folderEn.subfolder}
                  depth={depthEn}
                  getFolderIdAndName={getFolderIdAndName}
                  lan={"en"}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div>
          <label className="newPost__label">contentEn</label>
          <section className="quill">
            <QuillHandler getValue={getValue} lan={"en"}></QuillHandler>
          </section>{" "}
        </div>
        <div>
          <button type="submit" className="newPost__button">
            Add Meetup
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewPostForm;
