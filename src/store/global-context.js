import { createContext, useEffect, useState } from "react";

const GlobalStateContext = createContext({
  language: "",
  changeLanguage: (lan) => {},
  changeToken: (token) => {},
  folder: [],
  folderEn: [],
  post: "",
  token: "",
  getDir: () => {},
  getPost: () => {},
});

export function GlobalStateContextProvider(props) {
  const [language, setLanuage] = useState("en");
  const [folder, setFolder] = useState("");
  const [folderEn, setFolderEn] = useState("");
  const [post, setPost] = useState("");
  const [keyName, setKeyName] = useState("");

  // authentication
  const [token, setToken] = useState(false);

  function changeTokenHandler(token) {
    setToken(token);
    console.log(token);
  }

  function changeLanguageHandler(lan) {
    setLanuage((preLanguage) => {
      return lan;
    });
  }

  function changePostHandler(keyName) {
    console.log("keyName", keyName);
    setKeyName(keyName);
  }

  async function getDir(lan) {
    try {
      const res = await fetch(
        `http://127.0.0.1:4000/${lan}/api/dir/${
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

      console.log(`this is the fatched ${lan} data`, data.data);

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
        `http://127.0.0.1:4000/${lan}/api/postLanCollection/${keyName}`,
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
      console.log(`this is the fatched ${lan} post data`, data.data);

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
    } else if (!folder || !folderEn) {
      console.log("enter 2");
      getDir(language);
    }
    if (keyName) getPost(language, keyName);
  }, [language, keyName]);

  // useEffect(() => {
  //   console.log("post", post);
  //   getPost(language, post);
  // }, [post]);

  const context = {
    language,
    changeLanguage: changeLanguageHandler,
    changePost: changePostHandler,
    changeToken: changeTokenHandler,
    getDir,
    getPost,
    post,
    folder,
    folderEn,
    token,
  };

  return (
    <GlobalStateContext.Provider value={context}>
      {props.children}
    </GlobalStateContext.Provider>
  );
}

export default GlobalStateContext;
