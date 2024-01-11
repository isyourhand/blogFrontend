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
  const [loginState, setLoginState] = useState(
    localStorage.getItem("loginState")
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "user");

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
