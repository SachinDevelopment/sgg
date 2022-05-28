import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="border-2 border-black rounded p-2 bg-blue-400" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;