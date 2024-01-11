import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/Pagenation.css";

function PageItem(props) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

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
          pageHandler(e, props.i);
        }}
        className="page-link"
      >
        {props.i}
      </button>
    </li>
  );
}

export default PageItem;
