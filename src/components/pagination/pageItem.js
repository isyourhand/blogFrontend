import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/Pagenation.css";

function PageItem(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const i = props.i;
  const isIt = props.isIt;

  // console.log(i, isIt);

  const navigate = useNavigate();

  function pageHandler(e, num) {
    e.preventDefault();
    queryParams.set("page", num);
    navigate(`?${queryParams.toString()}`);
  }

  return (
    <li className="page-item">
      <button
        onClick={(e) => {
          pageHandler(e, i);
        }}
        className="page-link"
        style={{ backgroundColor: isIt ? "#4bbb7d" : "" }}
      >
        {props.i}
      </button>
    </li>
  );
}

export default PageItem;
