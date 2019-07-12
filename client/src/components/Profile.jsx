import React from "react";
import { useAuth0 } from "../authenticationWrapper.js";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <p id="login-request">Please log in: </p>
    );
  }

  return (
    <>
      <img className="profile-logo" src={user.picture} alt="Profile" />
      <div className="user-sub-info">
        <h5 className="username">{user.name}</h5>
        <p className="email">{user.email}</p>
      </div>
    </>
  );
};

export default Profile;