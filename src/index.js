import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import MainRouter from "./router/MainRouter";
import "./fonts/PingFangRegular.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
