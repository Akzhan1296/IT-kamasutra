import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import { AppStateType } from "./redux/redux-store";
import { LoginPage } from "./components/Login/LoginPage";
import HeaderContainer from "./components/header/headerContainer";
import Navbar from "./components/navbar/navbar";

//import ProfileContainer from "./components/profile/profileContainer";
// import DialogsContainer from "./components/dialogs/dialogsContainer";
import {UsersPage} from "./components/users/usersContainer";
// import News from "./components/news/news";
// import Setting from "./components/setting/setting";
// import Music from "./components/music/music";
import "./App.css";
import Preloader from "./components/common/preloader/Preloader";
import { WithSuspense } from "./hoc/WithSuspense";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  withRouter,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/redux-store";

//lazy loading
const DialogsContainer = React.lazy(() =>
  import("./components/dialogs/dialogsContainer")
); 
const ProfileContainer = React.lazy(() =>
  import("./components/profile/profileContainer")
);

const SuspendedDialogs = WithSuspense(DialogsContainer)
const SuspendedProfile = WithSuspense(ProfileContainer)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}
 

class App extends Component<MapPropsType & DispatchPropsType > {
  catchAllUnhandledError = (e: PromiseRejectionEvent) => {
    alert("Some error");
  };

  componentDidMount() {
    this.props.initializeApp(); //Использовали thunk

    window.addEventListener("unhandledrejection", this.catchAllUnhandledError);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledError
    );
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
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/profile" />} />
            <Route
              exact
              path="/dialogs"
              render={() =>  <SuspendedDialogs/> }
            />
            <Route
              path="/profile/:userId?"
              render={() => <SuspendedProfile/>}
            />
            <Route path="/users" render={() => <UsersPage pageTitle={"Самураи"}/>} />
            <Route path="/login" render={() => <LoginPage />} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};

let AppContainer = compose<React.ComponentType>   (
  withRouter,
  connect(mapStateToProps, {
    initializeApp,
  })
)(App);

const SamuraiJSApp: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Router>
  );
};

export default SamuraiJSApp;

{
  /* <Route path="/news" component={News} />
<Route path="/music" component={Music} />
<Route path="/setting" component={Setting} /> */
}
