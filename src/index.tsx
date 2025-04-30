import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
      <Router>
        <App />
      </Router>
    // </React.StrictMode>
  );
} else {
  console.error("Não foi possível encontrar o elemento com o ID 'root' no HTML.");
}

reportWebVitals();