import React from 'react';

class GoogleAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sign-in-button">
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    )
  }
}

export default GoogleAuthentication;