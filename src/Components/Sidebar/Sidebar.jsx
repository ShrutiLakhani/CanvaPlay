import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar-left">
      <div className="sidebar-links">
        <span class="material-symbols-outlined">explore</span>
        <Link to="/explore" className="sidebar-links-name">
          Explore
        </Link>
      </div>
      <div className="sidebar-links">
        <span class="material-symbols-outlined">history</span>
        <Link to="/history" className="sidebar-links-name">
          History
        </Link>
      </div>
      <div className="sidebar-links">
        <span class="material-symbols-outlined">schedule</span>
        <Link to="/watchlater" className="sidebar-links-name">
          Watch Later
        </Link>
      </div>
      <div className="sidebar-links">
        <span class="material-symbols-outlined">thumb_up</span>
        <Link to="/liked" className="sidebar-links-name">
          Liked videos
        </Link>
      </div>
      <div className="sidebar-links">
        <span class="material-symbols-outlined">playlist_play</span>
        <Link to="/playlist" className="sidebar-links-name">
          Playlist
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;