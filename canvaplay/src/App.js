import "./App.css";
import { Navbar, Sidebar } from "./Components/components";
import { Routes, Route, Link } from "react-router-dom";
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
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
