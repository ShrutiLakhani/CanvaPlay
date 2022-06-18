import "./App.css";
import { Navbar, VideoCard, Sidebar } from "./Components/components";
import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";
import {
  LoginPage,
  Signup,
  Explore,
  History,
  Liked,
  Playlist,
  Watchlater,
} from "./Pages/pages";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mock" element={<Mockman />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/history" element={<History />} />
        <Route path="/watchlater" element={<Watchlater />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </div>
  );
}

export default App;
