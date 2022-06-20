import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeItemFromLikedVideos } from "../../backend/controllers/LikeController";
import { useLiked } from "../../context/like-context";
import { useWatchLater } from "../../context/watchlater-context";
import "./LikedVideoCard.css";

function LikedVideoCard({ video }) {
  const navigate = useNavigate();
  const [showDropdown, setshowDropdown] = useState(true);
  const { addToWatchlist } = useWatchLater();
  const { removeFromLikedList } = useLiked();
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

  const addToWatchLater = (e, video) => {
    addToWatchlist(video);
  };

  const removeFromLikedVideos = (e, id) => {
    removeFromLikedList(id);
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
              <button
                className="dropdown-menu-btn-1"
                onClick={(e) => {
                  addToWatchLater(e, video);
                }}
              >
                Add to Watch Later
              </button>
              <button
                className="dropdown-menu-btn"
                onClick={(e) => {
                  removeFromLikedVideos(e, _id);
                }}
              >
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
