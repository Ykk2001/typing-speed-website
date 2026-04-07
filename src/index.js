import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import TestModeProvider from "./Context/TestModeProvider.jsx";
import ThemeProvider from "./Context/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <TestModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
