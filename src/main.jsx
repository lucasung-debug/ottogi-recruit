import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./fonts.css";
import { CompanyProfileProvider } from "./context/CompanyProfileContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <CompanyProfileProvider>
        <App />
      </CompanyProfileProvider>
    </HashRouter>
  </React.StrictMode>
);
