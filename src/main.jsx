import React from "react";
import ReactDOM from "react-dom/client";
import { FormApp } from "./FormApp.jsx";
import "bulma/css/bulma.min.css";
import { Router } from "./router/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <FormApp />
    </Router>
  </React.StrictMode>
);
