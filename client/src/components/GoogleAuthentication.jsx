import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index.js';
import CLIENT_ID from '../../config/clientId.js';
import Axios from 'axios';

class GoogleAuthentication extends React.Component {
  constructor(props) {
    super(props);

    this.onAuthChange = this.onAuthChange.bind(this);
    this.renderAuthButton = this.renderAuthButton.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.handleSignUpButtonClick = this.handleSignUpButtonClick.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
        this.auth.isSignedIn.listen(this.handleNewUser);
      })
    });
  }

  onAuthChange(isSignedIn) {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getBasicProfile());
      this.props.getUserStocks(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
      this.props.handleUserSignOut();
    }
  }

  handleSignUpButtonClick(){
    this.auth.signIn();
  }

  handleNewUser() {
    let googleProfile = this.auth.currentUser.get().getBasicProfile();
    let userProfile= {
      userId: googleProfile.getId(),
      email: googleProfile.getEmail(),
      fullName: googleProfile.getName(),
      firstName: googleProfile.getGivenName(),
      lastName: googleProfile.getFamilyName(),
      profileImg: googleProfile.getImageUrl()
    }
    Axios.post('users/newUser', userProfile)
      .then(console.log('success'))
      .catch(console.log('failed'));
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return(
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon" />
          Sign Out
        </button>
      )
    } else {
      return (
        <div>
          <button className="ui red google button" onClick={this.handleSignUpButtonClick}>Sign Up</button>
          <button className="ui red google button" onClick={this.onSignIn}>
          <i className="google icon" />
          Sign In With Google
          </button>
        </div>
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

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(
  mapStateToProps, 
  { signIn, signOut }
)(GoogleAuthentication);