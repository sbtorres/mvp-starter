import React from 'react';

class GoogleAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.gapi.load('client:auth2');
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