import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchLater } from "../../context/watchlater-context";
import { useLiked } from "../../context/like-context";
import "./WatchlaterCard.css";

function WatchlaterCard({ video }) {
  const navigate = useNavigate();
  const [showDropdown, setshowDropdown] = useState(true);
  const { removeFromWatchlist } = useWatchLater();
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

  const addtoLikedVideos = (e, video) => {
    addToLikeList(video);
  };
  const removeWatchlater = (e, id) => {
    removeFromWatchlist(id);
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
                className="dropdown-watchlater-menu-btn"
                onClick={(e) => removeWatchlater(e, _id)}
              >
                Remove from Watch Later
              </button>
              <button
                className="dropdown-watchlater-menu-btn-1"
                onClick={(e) => {
                  addtoLikedVideos(e, video);
                }}
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
export default WatchlaterCard;
