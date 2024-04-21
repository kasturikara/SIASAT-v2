// component
import React from "react";

// dom
import ReactDOM from "react-dom/client";

// styles
import "./index.css";

// app
import App from "./App";

// router
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
