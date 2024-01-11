import { useContext, useState } from "react";
import "./css/LoginModal.css";
import AuthStateContext from "../../store/auth-context";
import axios from "axios";

function LoginModal(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const closeModal = props.onClick;

  const AuthStateCtx = useContext(AuthStateContext);
  // console.log("test output token -> ", AuthStateCtx.token);

  const changeLoginState = AuthStateCtx.changeLoginState;
  const changeRole = AuthStateCtx.changeRole;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = async (data) => {
    try {
      console.log(typeof data);

      // const res = await axios({
      //   method: "POST",
      //   url: "http://127.0.0.1:4000/cn/api/users/login",
      //   data,
      // });

      const res = await fetch("http://127.0.0.1:4000/cn/api/users/login", {
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

      if (user.status) {
        changeLoginState(true);
      }

      console.log("cookie->", document.cookie);
      // localStorage.setItem("jwt", user_.token);
      // document.cookie = `jwt=${user_.token}`;
      // changeToken(user_.token);
      changeRole(user.data.user.role);

      console.log(user);

      closeModal();

      alert("success!");
    } catch (err) {
      console.error(err);
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
