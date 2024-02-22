import { createContext, useEffect, useState } from "react";

const GlobalStateContext = createContext({
  language: "",
  changeLanguage: (lan) => {},
  folder: [],
  folderEn: [],
  post: "",
  getDir: () => {},
  getPost: () => {},
});

export function GlobalStateContextProvider(props) {
  const [language, setLanuage] = useState("cn");
  const [folder, setFolder] = useState("");
  const [folderEn, setFolderEn] = useState("");
  const [post, setPost] = useState("");
  const [keyName, setKeyName] = useState("");
  const [reRender, setReRender] = useState(false);

  const hostName =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:4000"
      : "https://llog.top:4000";

  function changeLanguageHandler(lan) {
    console.log(lan);
    setLanuage((preLanguage) => {
      return lan;
    });
  }

  function changeReRenderHandler() {
    setReRender((pre) => !pre);
  }

  function changePostHandler(keyName) {
    console.log("keyName", keyName);
    setKeyName(keyName);
  }

  async function getDir(lan) {
    try {
      const res = await fetch(
        `${hostName}/${lan}/api/dir/${
          lan === "cn" ? "6562436223c603f25345c2c8" : "6582bfd5495b133c7bfea0ab"
        }`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      // console.log(`this is the fatched ${lan} data`, data.data);

      if (lan === "cn") setFolder(data.data.doc);
      else setFolderEn(data.data.doc);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPost(lan, keyName) {
    try {
      console.log("start getting data...");
      const res = await fetch(
        `${hostName}/${lan}/api/postLanCollection/${keyName}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.data.doc) {
        throw new Error(`No data fetched for ${lan}.`);
      }
      // console.log(`this is the fatched ${lan} post data`, data.data);

      setPost(data.data.doc);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("folder? ->", Boolean(folder), folder.length === 0, language);
    if (window.location.href === "http://localhost:3000/New") {
      console.log("enter 1");
      getDir("en");
      getDir("cn");
    } else if (!folder || !folderEn || reRender || !reRender) {
      console.log("enter 2");
      // getDir(language);
      getDir("en");
      getDir("cn");
    }
    if (keyName) getPost(language, keyName);
  }, [language, keyName, reRender]);

  // useEffect(() => {
  //   console.log("rerender");
  // }, [reRender]);

  const context = {
    language,
    changeLanguage: changeLanguageHandler,
    changePost: changePostHandler,
    changeReRender: changeReRenderHandler,
    getDir,
    getPost,
    post,
    folder,
    folderEn,
    hostName,
    reRender,
  };

  return (
    <GlobalStateContext.Provider value={context}>
      {props.children}
    </GlobalStateContext.Provider>
  );
}

export default GlobalStateContext;
