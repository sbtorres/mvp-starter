import React from 'react';
import CLIENT_ID from '../../config/clientId.js';
import { isNull } from 'util';

class GoogleAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: null };

    this.onAuthChange = this.onAuthChange.bind(this);
    this.renderAuthButton = this.renderAuthButton.bind(this);
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

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return(
        <button className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button className="ui red google button">
        <i className="google icon" />
        Sign In With Google
        </button>
      )
    }
  }

  render() {
    return (
      <div className="sign-in-button">
        {this.renderAuthButton()}
      </div>
    )
  }
}

export default GoogleAuthentication;