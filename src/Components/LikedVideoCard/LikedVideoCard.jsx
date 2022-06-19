import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LikedVideoCard({ video }) {
  const navigate = useNavigate();
  const [showDropdown, setshowDropdown] = useState(true);
  const {
    _id,
    thumbnail: { url },
    title,
    description,
    views,
    creator,
    creator_image,
    thumbnail,
  } = video;

  return (
    <div className="videocard-styling">
      <img className="videocard-thumbnail" src={thumbnail} alt="" />
      <div className="videocard-styling-bottom">
        <div className="videocard-info">
          <img
            src={creator_image}
            alt=""
            className="avatar-img avatar-small video-avatar"
          />
          <div className="video-text">
            <h4>{title}</h4>
            <p>{creator}</p>
            <p>{views}</p>
          </div>
          <div
            className="dropdown"
            onMouseOver={() => {
              setshowDropdown(!showDropdown);
            }}
            onMouseOut={() => {
              setshowDropdown(!showDropdown);
            }}
          >
            <span className="material-symbols-outlined dropdown-watchlater">
              more_vert
            </span>
            <div
              className={`${
                showDropdown
                  ? "dropdown-watchlater-menu"
                  : "dropdown-watchlater-menu active"
              }`}
            >
              <button className="dropdown-watchlater-menu-btn">
                Add to Watch Later
              </button>
              <button className="dropdown-watchlater-menu-btn-1">
                Remove from Liked Videos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LikedVideoCard;
