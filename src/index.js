import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/redux-store";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

//basename={process.env.PUBLIC_URL} browserRouter
ReactDOM.render(
  <Router >
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,

  document.getElementById("root")
);

// store.subscribe(() => {
//   renderTree();
// });

//компонента делает свой subscribe и уже store.subscribe не нужно
