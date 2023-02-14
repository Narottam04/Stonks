import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./App/store";

import "./index.css";

import AuthContextProvider from "./Context/AuthContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
