import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useVideo, useAuth } from "../../context/context";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { videoDispatch } = useVideo();
  const { loggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="canva-navbar">
        <div className="canva-logo-img logo-container">
          <Link to="/"></Link>
          <small className="logo-name">CanvaPlay</small>
        </div>
        <div className="navbar-input">
          <input type="text" />
          <span className="material-symbols-outlined navbar-input-icon">
            search
          </span>
        </div>
        <div className="navbar-links">
          {loggedIn ? (
            <Link
              to="/"
              className="logout-btn"
              onClick={() => setLoggedIn(false)}
            >
              Logout
            </Link>
          ) : (
            <div className="nav-action-buttons">
              <Link to="/login"> Login </Link>
              <Link to="/signup"> Sign Up </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
