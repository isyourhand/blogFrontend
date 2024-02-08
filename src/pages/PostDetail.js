import { useParams, useLocation } from "react-router-dom";
import "./css/PostDetail.css";
import { useEffect, useState, useContext } from "react";

import GlobalStateContext from "../store/global-context";
import MarkdownFactory from "../components/markdown/MarkdownFactory";

function PostDetail() {
  let { postId } = useParams();
  let { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [loadedPost, setloadedPost] = useState([]);

  const GlobalStateCtx = useContext(GlobalStateContext);

  const lan = GlobalStateContext.language;

  console.log(lan);

  useEffect(() => {
    if (!state) {
      console.log("need to fetch data.");
      fetch(`http://127.0.0.1:4000/${lan}/api/post/${postId}`, {
        method: "GET",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          return res.json();
        })
        .then((data) => {
          console.log(data);
          if (data.data.doc) {
            setloadedPost(data.data.doc);
            setIsLoading(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function postHtml(title, createdAt, topic, secondTopic, content) {
    const creationDate = new Date(createdAt).toLocaleString();

    return (
      <div className="blog-post">
        <h1>{title}</h1>
        <span className="date">{creationDate}</span>
        <div className="metadata">
          <span className="category">{topic}</span>
          <span className="category">{secondTopic}</span>
        </div>
        <div className="blog-content">
          <MarkdownFactory markdown={content} />
        </div>
      </div>
    );
  }

  if (state) {
    return postHtml(
      state.title,
      state.createdAt,
      state.topic,
      state.secondTopic,
      state.content
    );
  }

  return postHtml(
    loadedPost.title,
    loadedPost.createdAt,
    loadedPost.topic,
    loadedPost.secondTopic,
    loadedPost.content
  );
}

export default PostDetail;
