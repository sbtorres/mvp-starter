import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index.js';
import CLIENT_ID from '../../config/clientId.js';

class GoogleAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: null };

    this.onAuthChange = this.onAuthChange.bind(this);
    this.renderAuthButton = this.renderAuthButton.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
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
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignIn}>
        <i className="google icon" />
        Sign In With Google
        </button>
      )
    }
  }

  onSignIn() {
    this.auth.signIn();
  }

  onSignOut() {
    this.auth.signOut();
  }

  render() {
    return (
      <div className="auth-button-container">
        {this.renderAuthButton()}
      </div>
    )
  }
}

export default connect(
  null, 
  { signIn, signOut }
)(GoogleAuthentication);