import { createContext, useEffect, useState } from "react";

const AuthStateContext = createContext({
  changeToken: (token) => {},
  token: "",
  role: "user",
  loginState: "",
});

export function AuthStateContextProvider(props) {
  // authentication
  const [token, setToken] = useState("null");
  const [loginState, setLoginState] = useState(false);
  const [role, setRole] = useState("user");

  const getRole = async () => {
    const hostName =
      process.env.REACT_APP_ENV === "development"
        ? "http://127.0.0.1:4000"
        : "http://8.134.236.92:4000";
    try {
      const res = await fetch(`${hostName}/cn/api/users/whoami`, {
        method: "GET",
        credentials: "include",
      });
      const user = await res.json();

      console.log(user);

      if (user.status !== "error") {
        setRole(user.role);
        setLoginState(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  function changeTokenHandler(token) {
    setToken(token);
  }

  function changeRoleHandler(role) {
    setRole(role);
    localStorage.setItem("role", role);
    console.log("Current Role -> ", role);
  }

  function changeLoginStateHandler(bool) {
    setLoginState(bool);
    localStorage.setItem("loginState", bool);
  }

  const context = {
    changeToken: changeTokenHandler,
    changeRole: changeRoleHandler,
    changeLoginState: changeLoginStateHandler,
    token,
    role,
    loginState,
  };

  return (
    <AuthStateContext.Provider value={context}>
      {props.children}
    </AuthStateContext.Provider>
  );
}

export default AuthStateContext;
