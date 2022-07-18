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
  PlaylistProvider,
} from "./context/context";
import PlayList from "./Components/PlayListCard/PlayListCard";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlaylistProvider>
          <LikedProvider>
            <WatchlaterProvider>
              <VideoProvider>
                <App />
              </VideoProvider>
            </WatchlaterProvider>
          </LikedProvider>
        </PlaylistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
