import { useEffect, useState, useContext } from "react";

import NewPostForm from "../components/post/NewPostForm";
import GlobalStateContext from "../store/global-context";

function NewPost() {
  const GlobalStateCtx = useContext(GlobalStateContext);

  const dir = GlobalStateCtx.folder;
  const dirEn = GlobalStateCtx.folderEn;
  const hostName = GlobalStateCtx.hostName;

  console.log("dir", dir, "dirEn", dirEn, 1);

  async function createPostHandler(postData, id, lan) {
    try {
      console.log("there is folder id ->", id);
      const response = await fetch(`${hostName}/${lan}/api/post/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post: ", err.message);
    }
  }

  return (
    <section>
      <NewPostForm
        name={dir.name}
        folder={dir}
        _id={dir._id}
        depth={0}
        createPostHandler={createPostHandler}
        nameEn={dirEn.name}
        folderEn={dirEn}
        _idEn={dirEn._id}
        depthEn={0}
      />
    </section>
  );
}

export default NewPost;
