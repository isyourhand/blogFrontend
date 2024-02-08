import { useContext, useState } from "react";
import "./css/LoginModal.css";
import AuthStateContext from "../../store/auth-context";

import AlertModal from "./AlertModal";

function LoginModal(props) {
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("error");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const closeModal = props.onClick;

  const AuthStateCtx = useContext(AuthStateContext);
  // console.log("test output token -> ", AuthStateCtx.token);

  const changeLoginState = AuthStateCtx.changeLoginState;
  const changeRole = AuthStateCtx.changeRole;
  const hostName = AuthStateCtx.hostName;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openAlertModal = () => {
    setAlert(true);
  };

  const closeAlertModal = () => {
    setAlert(false);
  };

  const login = async (data) => {
    try {
      console.log(typeof data);

      // const res = await axios({
      //   method: "POST",
      //   url: "http://127.0.0.1:4000/cn/api/users/login",
      //   data,
      // });

      const res = await fetch(`${hostName}/cn/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      // const Header = res.headers;

      // console.log("this is Header -> ", Header.getSetCookie());

      const user = await res.json();

      console.log(user);

      if (user.status === "success") {
        changeLoginState(true);

        changeRole(user.data.user.role);
        setMsg("Login Success!");
        openAlertModal();
        closeModal();
      } else {
        setMsg("Login Failure!");
        openAlertModal();
      }
    } catch (err) {
      console.error(err);
      setMsg("Login Failure!");
      openAlertModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data: ", credentials);
    login(credentials);
  };

  return (
    <div className="login-card">
      <div className="login-card-header">
        <h2>For Admin Use</h2>
      </div>
      <div className="login-card-body">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            valur={FormData.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            valur={FormData.password}
            onChange={handleInputChange}
          />

          <button className="login-card-button" type="submit">
            Login
          </button>
        </form>
      </div>
      {alert ? <AlertModal closeModal={closeAlertModal} msg={msg} /> : ""}
    </div>
  );
}

export default LoginModal;
