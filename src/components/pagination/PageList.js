import { Link } from "react-router-dom";
import "./css/Pagenation.css";
import PageItem from "./pageItem";

function PageList() {
  return (
    <ul className="pagination">
      <li className="page-item">
        <Link to="/Posts/" className="page-link">
          {"<"}
        </Link>
      </li>

      <PageItem />

      <li className="page-item">
        <Link to="/" className="page-link">
          {">"}
        </Link>
      </li>
    </ul>
  );
}

export default PageList;
