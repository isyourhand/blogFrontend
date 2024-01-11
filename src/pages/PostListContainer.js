import { useState, useEffect, useContext } from "react";

import "./css/PostListContainer.css";
import PostList from "../components/post/PostList";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LabelItem from "../components/label/LabelItem";
import PageItem from "../components/pagination/pageItem";
import GlobalStateContext from "../store/global-context";

function PostListContainer() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let [isLoading, setIsLoading] = useState(true);
  let [loadedPosts, setloadedPosts] = useState([]);

  let [currentPage, setCurrentPage] = useState(queryParams.get("page") * 1);

  const GlobalStateCtx = useContext(GlobalStateContext);

  const lan = GlobalStateCtx.language;

  useEffect(() => {
    setCurrentPage(queryParams.get("page") * 1);

    fetch(`http://127.0.0.1:4000/${lan}/api/post?${queryParams.toString()}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.data && data.data.posts) {
          console.log("posts data ->", data);
          setIsLoading(false);
          setloadedPosts(data);
        } else {
          console.error("Ivalid data format:", data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [location.search, lan]);

  if (isLoading) {
    return (
      <section>
        <p>Loading</p>
      </section>
    );
  }

  const labelUrl = {
    Frontend: "topic=Frontend&page=1&limit=3",
    Backend: "topic=Backend&page=1&limit=3",
    javascript: "secondTopic=javascript&page=1&limit=3",
    nodejs: "secondTopic=nodejs&page=1&limit=3",
    reactjs: "secondTopic=reactjs&page=1&limit=3",
    mongodb: "secondTopic=mongodb&page=1&limit=3",
    redis: "secondTopic=redis&page=1&limit=3",
    css: "secondTopic=css&page=1&limit=3",
    html: "secondTopic=html&page=1&limit=3",
  };

  function pagination(e, num) {
    // console.log("num", num);
    e.preventDefault();
    setCurrentPage((preCurrentPage) => preCurrentPage + num);
    queryParams.set("page", currentPage + num);
    navigate(`?${queryParams.toString()}`);
  }

  return (
    <section className="section_1">
      <section>
        <label className="Labels_">
          {Object.keys(labelUrl).map((topic, i) => {
            return (
              <Link to={`?${labelUrl[topic]}`} key={i}>
                <LabelItem topic={topic} />
              </Link>
            );
          })}
        </label>

        <PostList posts={loadedPosts.data.posts} />
      </section>

      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={(e) => {
              pagination(e, -1);
            }}
            className="page-link"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>

        {Array.from({ length: loadedPosts.results / 3 + 1 }, (x, i) => (
          <PageItem key={i} i={i + 1} />
        ))}

        <li className="page-item">
          <button
            onClick={(e) => {
              pagination(e, 1);
            }}
            className="page-link"
            disabled={currentPage === 5}
          >
            {">"}
          </button>
        </li>
      </ul>
    </section>
  );
}

export default PostListContainer;
