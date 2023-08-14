import React from "react";
import {createRoot} from "react-dom/client";
import {GlobalStyle} from "./src/globalStyle.jsx";
import {App} from "./src/App.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
