import React from "react";
import { Route } from "react-router-dom";

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


const App = (props) => {
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
};

export default App;

{
  /* <Route path="/news" component={News} />
<Route path="/music" component={Music} />
<Route path="/setting" component={Setting} /> */
}
