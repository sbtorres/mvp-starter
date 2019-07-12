import React from "react";
import { useAuth0 } from "../authenticationWrapper.js";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button className="login-button"
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log In
        </button>
      )}

      {isAuthenticated && <button className="login-button" onClick={() => logout()}>Log Out</button>}
    </div>
  );
};

export default NavBar;