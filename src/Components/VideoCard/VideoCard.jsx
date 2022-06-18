import React, { useState } from "react";
import { useVideo, useWatchLater } from "../../context/context";
import { DropdownPanel } from "../components";
import "./VideoCard.css";

function VideoCard({ video }) {
  const [showDropdown, setshowDropdown] = useState(true);
  const { addToWatchlist, watchlistVideos } = useWatchLater();

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
  const addtoWatchlater = (e, video) => {
    addToWatchlist(video);
  };
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
            <span className="material-symbols-outlined dropdown">
              more_vert
            </span>
            <div
              className={`${
                showDropdown ? "dropdown-menu" : "dropdown-menu active"
              }`}
            >
              <button
                className="dropdown-menu-btn"
                onClick={(e) => addtoWatchlater(e, video)}
              >
                Add to Watch Later
              </button>
              <button className="dropdown-menu-btn">Add to Liked Videos</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
