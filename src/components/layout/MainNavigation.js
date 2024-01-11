import { Link } from "react-router-dom";
import "./css/MainNavigation.css";
import { useContext, useRef, useState } from "react";
import AdviseModal from "../modal/AdviseModal";
import Backdrop from "../modal/BackDrop";
import catai from "./img/catai.jpg";
import github from "./img/social_github.png";
import AuthStateContext from "../../store/auth-context";

function MainNavigation() {
  // const nav = document.querySelector(".nav");
  const navRef = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const AuthStateCtx = useContext(AuthStateContext);

  const role = AuthStateCtx.role;

  function closeModalHandler() {
    setModalIsOpen(false);
  }
  function OpenModalHandler() {
    setModalIsOpen(true);
  }

  const handleHover = function (e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");

      siblings.forEach((el) => {
        if (el !== link) el.style.opacity = this;
      });
    }
  };

  // navRef.addEventListener("moseover", handleHover.bind(0.5));
  // navRef.addEventListener("moseover", handleHover.bind(1));

  return (
    <header className="header">
      <nav
        ref={navRef}
        className="nav"
        onMouseOver={handleHover.bind(0.5)}
        onMouseOut={handleHover.bind(1)}
      >
        <Link>
          <img
            src={catai}
            alt="userAvatar"
            className="nav__logo"
            onClick={OpenModalHandler}
          />
        </Link>
        <ul className="nav__links">
          <li className="nav__item">
            <Link className="nav__link" to="/">
              Overview
            </Link>
          </li>
          <li className="nav__item">
            <Link className="nav__link" to="/Posts?page=1&limit=3">
              Posts
            </Link>
          </li>
          {role === "admin" ? (
            <li className="nav__item">
              <Link className="nav__link" to="/New">
                New
              </Link>
            </li>
          ) : (
            ""
          )}
          <li className="nav__item">
            <Link
              className="nav__link nav__link__btn"
              to="https://github.com/isyourhand"
            >
              {/* <img
                src={github}
                alt="github"
                style={{
                  width: "30px",
                  height: "25px",
                  borderRadius: "50%",
                  paddingTop: "4px",
                  paddingRight: "5px",
                }}
              /> */}
              MyGithub
            </Link>
          </li>
        </ul>
      </nav>
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      {modalIsOpen && <AdviseModal close={closeModalHandler} />}
    </header>
  );
}

export default MainNavigation;
