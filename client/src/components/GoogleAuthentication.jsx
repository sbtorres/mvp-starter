import React from 'react';
import CLIENT_ID from '../../config/clientId.js';

class GoogleAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email'
      })
    });
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