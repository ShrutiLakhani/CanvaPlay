import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { removeItemFromLikedVideos } from "../../backend/controllers/LikeController";
import { useLiked, useWatchLater, useVideo } from "../../context/context";
import "./HistoryCard.css";

function HistoryCard({ video }) {
  const navigate = useNavigate();
  const [showDropdown, setshowDropdown] = useState(true);
  const { addToWatchlist } = useWatchLater();
  const { addToLikeList } = useLiked();
  const { deleteFromHistory } = useVideo();
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

  const addToLikedVideos = (e, id) => {
    addToLikeList(id);
  };

  const navigateToVideo = () => {
    navigate(`/video/${_id}`);
  };

  const deleteHistoryCard = (e, id) => {
    deleteFromHistory(id);
  };

  return (
    <div className="videocard-styling">
      <div className="video-container">
        <img
          className="videocard-thumbnail"
          src={thumbnail}
          alt=""
          onClick={navigateToVideo}
        />
        <span
          class="material-symbols-outlined close-history-btn"
          onClick={(e) => deleteHistoryCard(e, _id)}
        >
          close
        </span>
      </div>
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
                className="dropdown-history-menu-btn"
                onClick={(e) => {
                  addToWatchLater(e, video);
                }}
              >
                Add to Watch Later
              </button>
              <button
                className="dropdown-history-menu-btn"
                onClick={(e) => {
                  addToLikedVideos(e, video);
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
export default HistoryCard;
