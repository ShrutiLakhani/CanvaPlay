import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  VideoProvider,
  WatchlaterProvider,
  LikedProvider,
} from "./context/context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LikedProvider>
          <WatchlaterProvider>
            <VideoProvider>
              <App />
            </VideoProvider>
          </WatchlaterProvider>
        </LikedProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
