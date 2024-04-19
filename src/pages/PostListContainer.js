import { useState, useEffect, useContext } from "react";

import "./css/PostListContainer.css";
import PostList from "../components/post/PostList";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LabelItem from "../components/label/LabelItem";
import PageItem from "../components/pagination/pageItem";
import GlobalStateContext from "../store/global-context";
import { getPosts } from "../store/backEndResAcq";

function PostListContainer() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  let [isLoading, setIsLoading] = useState(true);
  let [loadedPosts, setloadedPosts] = useState([]);

  let [currentPage, setCurrentPage] = useState(queryParams.get("page") * 1);

  const GlobalStateCtx = useContext(GlobalStateContext);

  const lan = GlobalStateCtx.language;
  const hostName = GlobalStateCtx.hostName;

  useEffect(() => {
    setCurrentPage(queryParams.get("page") * 1);

    getPosts(hostName, lan, queryParams, setIsLoading, setloadedPosts);

    // fetch(`${hostName}/${lan}/api/post?${queryParams.toString()}`, {
    //   method: "GET",
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`HTTP error! Status: ${res.status}`);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     if (data && data.data && data.data.posts) {
    //       console.log("posts data ->", data);
    //       setIsLoading(false);
    //       setloadedPosts(data);
    //     } else {
    //       console.error("Ivalid data format:", data);
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     console.log(err);
    //   });
  }, [location.search, lan]);

  if (isLoading) {
    return (
      <section>
        <p>Loading</p>
      </section>
    );
  }

  const labelUrl = {
    Frontend: "topic=Frontend&page=1&limit=7",
    Backend: "topic=Backend&page=1&limit=7",
    javascript: "secondTopic=javascript&page=1&limit=7",
    nodejs: "secondTopic=nodejs&page=1&limit=7",
    reactjs: "secondTopic=reactjs&page=1&limit=7",
    mongodb: "secondTopic=mongodb&page=1&limit=7",
    redis: "secondTopic=redis&page=1&limit=7",
    express: "secondTopic=express&page=1&limit=7",
    linux: "secondTopic=linux&page=1&limit=7",
    windows: "secondTopic=windows&page=1&limit=7",
  };

  function pagination(e, num) {
    // console.log("num", num);
    e.preventDefault();
    setCurrentPage((preCurrentPage) => preCurrentPage + num);
    queryParams.set("page", currentPage + num);
    navigate(`?${queryParams.toString()}`);
  }

  // console.log(loadedPosts);

  const pages = Math.ceil(loadedPosts.results / (queryParams.get("limit") * 1));

  return (
    <section className="section_1">
      <section>
        <div className="Labels_">
          {Object.keys(labelUrl).map((topic, i) => {
            return (
              <Link to={`?${labelUrl[topic]}`} key={i}>
                <LabelItem topic={topic} />
              </Link>
            );
          })}
        </div>

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

        {Array.from(
          {
            length: pages,
          },
          (x, i) => (
            <PageItem
              key={i}
              i={i + 1}
              isIt={queryParams.get("page") * 1 === i + 1}
            />
          )
        )}

        <li className="page-item">
          <button
            onClick={(e) => {
              pagination(e, 1);
            }}
            className="page-link"
            disabled={currentPage === pages}
          >
            {">"}
          </button>
        </li>
      </ul>
    </section>
  );
}

export default PostListContainer;
