import PostItem from "./PostItem";

import "./css/PostList.css";

function PostList(props) {
  return (
    <ul className="post-list">
      {props.posts.map((post) => (
        <PostItem
          key={post._id}
          _id={post._id}
          createdAt={post.createdAt}
          title={post.title}
          content={post.content}
          topic={post.topic}
          secondTopic={post.secondTopic}
          introduction={post.introduction}
        />
      ))}
    </ul>
  );
}

export default PostList;
