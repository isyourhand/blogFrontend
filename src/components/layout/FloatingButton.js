import { useContext, useState } from "react";
import "./css/FloatingButton.css";

import translate from "./img/translate.svg";
import login from "./img/login.png";
import loginOut from "./img/login_Out.png";

import GlobalStateContext from "../../store/global-context";
import LoginModal from "../modal/LoginModal";
import Backdrop from "../modal/BackDrop";
import AuthStateContext from "../../store/auth-context";

function FloatingButton() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const AuthStateCtx = useContext(AuthStateContext);
  const GlobalStateCtx = useContext(GlobalStateContext);

  const lan = GlobalStateCtx.language;
  const setLanguage = GlobalStateCtx.changeLanguage;
  const hostName = AuthStateCtx.hostName;
  const loginState = AuthStateCtx.loginState;
  const changeLoginState = AuthStateCtx.changeLoginState;
  const changeRole = AuthStateCtx.changeRole;

  const handleLoginModal = () => {
    console.log(showLoginModal);
    setShowLoginModal((pre) => {
      return !pre;
    });
  };

  function closeModalHandler() {
    setShowLoginModal(false);
  }

  async function loginOutHandler() {
    try {
      const res = await fetch(`${hostName}/cn/api/users/login`, {
        method: "GET",
        credentials: "include",
      });

      const state = await res.json();

      if (state.status) {
        changeLoginState(false);
        changeRole("user");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div
        className="floating-button-translate"
        onClick={(e) => setLanguage(lan === "cn" ? "en" : "cn")}
      >
        <img src={translate} alt="translate" />
      </div>
      {!loginState ? (
        <div
          className="floating-button-login"
          onClick={(e) => handleLoginModal()}
        >
          <img src={login} alt="translate" width={25} height={25} />
        </div>
      ) : (
        <div
          className="floating-button-login"
          onClick={(e) => loginOutHandler()}
        >
          <img src={loginOut} alt="translate" width={25} height={25} />
        </div>
      )}
      {showLoginModal ? <LoginModal onClick={closeModalHandler} /> : ""}
      {showLoginModal ? <Backdrop onClick={closeModalHandler} /> : ""}
    </div>
  );
}

export default FloatingButton;
