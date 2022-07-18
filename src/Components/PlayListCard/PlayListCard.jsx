import React from "react";
import "./PlayListCard.css";
import { useNavigate, Link } from "react-router-dom";
import emptyNote from "../../assets/Images/video_img.svg";
import { removePlaylistHandler } from "../../backend/controllers/PlaylistController";
import { usePlaylist } from "../../context/playlist-context";
import { useVideo } from "../../context/video-context";

function PlayList({ video }) {
  const navigate = useNavigate();
  const id = video.videos[0]._id;

  const { removePlaylist } = usePlaylist();
  const { videoDispatch } = useVideo();

  return (
    <div className="videocard-styling">
      <Link to={`/playlist/${video._id}`}>
        <img
          src={video.videos[0].thumbnail}
          className="videocard-thumbnail"
          alt={video.title}
        />
      </Link>

      <div className="playlist-card-bottom">
        <h4>{video.title}</h4>
        <span
          class="material-symbols-outlined"
          onClick={() => removePlaylist(video, videoDispatch)}
        >
          delete
        </span>
      </div>
      <h5>Videos:{video.videos.length}</h5>
    </div>
  );
}

export default PlayList;
