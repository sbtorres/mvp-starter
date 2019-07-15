import React from "react";
import { Link } from "react-router-dom";
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

      {isAuthenticated && (
      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/portfolioView">User Portfolio</Link>
      </span>
    )}
    </div>
  );
};

export default NavBar;