import React from 'react';
import CLIENT_ID from '../../config/clientId.js';

class GoogleAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: null };

    this.onAuthChange = this.onAuthChange.bind(this);
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange() {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
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