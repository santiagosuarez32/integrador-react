import React from "react";
import ReactDOM from "react-dom/client"; // ⬅ Debe ser "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
