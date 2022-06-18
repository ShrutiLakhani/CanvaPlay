import React, { useState } from "react";
import "./WatchlaterCard.css";

function WatchlaterCard({ video }) {
  console.log("And here?");
  console.log(video);
  const [showDropdown, setshowDropdown] = useState(true);

  //   const {
  //     id,
  //     thumbnail: { url },
  //     title,
  //     description,
  //     views,
  //     creator,
  //     creator_image,
  //     thumbnail,
  //   } = video;
  return (
    <div className="videocard-styling">
      <img
        className="videocard-thumbnail"
        src="https://i.ytimg.com/vi/q-0QYYp46yU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&amp;rs=AOn4CLCBA42AKENgau1xrdogLiYcYFkiPA"
        alt=""
      />
      <div className="videocard-styling-bottom">
        <div className="videocard-info">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiLxQNn-8IpxEdW1XIWnkxv75UJ7L1LZRtTw&usqp=CAU"
            alt=""
            className="avatar-img avatar-small video-avatar"
          />
          <div className="video-text">
            <h4>MK</h4>
            <p>Vogue</p>
            <p>1.8M</p>
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
                Remove from Watch Later
              </button>
              <button className="dropdown-watchlater-menu-btn-1">
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
