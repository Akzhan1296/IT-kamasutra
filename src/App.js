import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";

import Login from "./components/Login/Login";
import HeaderContainer from "./components/header/headerContainer";
import Navbar from "./components/navbar/navbar";
import ProfileContainer from "./components/profile/profileContainer";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/usersContainer";
// import News from "./components/news/news";
// import Setting from "./components/setting/setting";
// import Music from "./components/music/music";

import "./App.css";
import Preloader from "./components/common/preloader/Preloader";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp(); //Использовали thunk
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route exact path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    initializeApp,
  })
)(App);

{
  /* <Route path="/news" component={News} />
<Route path="/music" component={Music} />
<Route path="/setting" component={Setting} /> */
}
