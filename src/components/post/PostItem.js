import { Link } from "react-router-dom";
import "./css/PostItem.css";

function PostItem(props) {
  const frontEndHostname = window.location.origin;

  console.log(frontEndHostname);

  return (
    <li className="post">
      <div className="post-labels-container">
        <Link
          to={`${frontEndHostname}/Posts/${props._id}`}
          state={props}
          className="post-title-link"
        >
          <h2 className="post-title">{`${props.title}`}</h2>
        </Link>

        <div className="post_label">{props.topic}</div>
        <div className="post_label">{props.secondTopic}</div>
      </div>
      <p className="post-content">{`${props.introduction}...`}</p>
      {/* <div dangerouslySetInnerHTML={{ __html: props.content }} /> */}
    </li>
  );
}

export default PostItem;
