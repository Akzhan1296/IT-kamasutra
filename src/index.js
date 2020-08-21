import React from "react";
import ReactDOM from "react-dom";
import SamuraiJSApp from "./App";

import "./index.css";

//basename={process.env.PUBLIC_URL} browserRouter
ReactDOM.render(
  <SamuraiJSApp />,
  document.getElementById("root")
);

// store.subscribe(() => {
//   renderTree();
// });

//компонента делает свой subscribe и уже store.subscribe не нужно
