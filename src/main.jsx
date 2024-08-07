import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "./components/themeProvider/ThemeProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "./components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
