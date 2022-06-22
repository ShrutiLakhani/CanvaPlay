import React, { useState } from "react";
import { useVideo, useWatchLater, useLiked } from "../../context/context";
import { DropdownPanel } from "../components";
import { Link } from "react-router-dom";
import "./VideoCard.css";
import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const [showDropdown, setshowDropdown] = useState(true);
  const { addToWatchlist, watchlistVideos } = useWatchLater();
  const { addToLikeList } = useLiked();

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

  const navigate = useNavigate();

  const navigateToVideo = () => {
    navigate(`/video/${_id}`);
  };

  const addtoWatchlater = (e, video) => {
    addToWatchlist(video);
  };

  const addtoLikedVideos = (e, video) => {
    addToLikeList(video);
  };

  return (
    <div className="videocard-styling">
      <img
        className="videocard-thumbnail"
        src={thumbnail}
        alt=""
        onClick={navigateToVideo}
      />
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
              <button
                className="dropdown-menu-btn"
                onClick={(e) => addtoLikedVideos(e, video)}
              >
                Add to Liked Videos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
