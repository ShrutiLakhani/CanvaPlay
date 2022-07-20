import "./App.css";
import { Navbar, VideoCard, Sidebar } from "./Components/components";
import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";
import { ToastContainer, toast } from "react-toastify";
import RequiresAuth from "./Components/RequiresAuth";

import {
  LoginPage,
  Signup,
  Explore,
  History,
  Liked,
  PlayListPage,
  Watchlater,
  VideoPage,
  Playlist,
} from "./Pages/pages";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route element={<RequiresAuth />}>
          <Route path="/history" element={<History />} />
          <Route path="/watchlater" element={<Watchlater />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlist/:videoId" element={<PlayListPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mock" element={<Mockman />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
