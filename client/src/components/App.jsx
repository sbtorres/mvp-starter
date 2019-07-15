import React from 'react';
import 'babel-polyfill';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './Navbar.jsx';
import Profile from './Profile.jsx';
import UserPortfolioView from './UserPortfolioView.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { Auth0Context } from ".././authenticationWrapper.js";

class App extends React.Component {
  static contextType = Auth0Context;

  render () {
    return (
      <div>
        <div id="app-header">
          <img src="icon.png" alt="app-logo" height="36" width="36"></img>
          <h1>MyIndex</h1>
          <div id="profile-header">
            <Profile />
          </div>
        </div>
        <BrowserRouter>
          <div>
          <Navbar />
          </div>
          <Switch>
            <Route path="/" exact />
            <PrivateRoute path="/portfolioView" component={UserPortfolioView} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;