import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useVideo } from "../../context/context";
function Navbar() {
  const { videoDispatch } = useVideo();
  return (
    <>
      <div className="canva-navbar">
        <div className="canva-logo-img logo-container">
          <Link to="/"></Link>
          <small className="logo-name">CanvaPlay</small>
        </div>
        <div className="navbar-input">
          <input
            type="text"
            onChange={(e) =>
              videoDispatch({ type: "SEARCH_FOR", payload: e.target.value })
            }
          />
          <span className="material-symbols-outlined navbar-input-icon">
            search
          </span>
        </div>
        <div className="navbar-links">
          <Link to="login" className="navbar-login-link">
            Login
          </Link>
          <Link to="signup" className="navbar-signup-link">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
