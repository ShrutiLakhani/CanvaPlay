import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useVideo, useWatchLater, useLiked } from "../../context/context";
import { Sidebar, VideoCard } from "../../Components/components";
import "./VideoPage.css";
import { Link } from "react-router-dom";

function VideoPage() {
  const { videoId } = useParams();
  const { allVideos, addToHistory, filteredList } = useVideo();
  const { addToWatchlist } = useWatchLater();
  const { addToLikeList } = useLiked();

  const getVideos = (allVideos, videoId) => {
    return allVideos.find((video) => video._id === videoId);
  };

  const suggestedVideos = (filteredVideos, video) => {
    return filteredVideos.filter((vid) => vid.category === video.category);
  };

  const addToWatchLater = (e, video) => {
    addToWatchlist(video);
  };

  const addToLikedVideos = (e, video) => {
    addToLikeList(video);
  };

  const addtoHistoryVideo = (video) => {
    addToHistory(video);
  };

  const video = getVideos(allVideos, videoId);
  const suggestedList = suggestedVideos(filteredList, video);
  return (
    <div className="video-container">
      <div className="video-pages">
        <Sidebar />
        <ReactPlayer
          className="react-player-card"
          controls={true}
          width="1024px"
          height="575px"
          playing={true}
          onReady={addtoHistoryVideo(video)}
          url={`https://wwww.youtube.com/watch?v=${videoId}`}
        />
      </div>
      <div className="video-info-container">
        <img
          src={video.creator_image}
          alt=""
          className="avatar-img avatar-small video-avatar"
        />
        <div className="video-text">
          <h4>{video.title}</h4>
          <p>{video.creator}</p>
          <p>{video.views}</p>
        </div>
        <div className="videopage-sidebar-links">
          <span
            class="material-symbols-outlined"
            onClick={(e) => {
              addToWatchLater(e, video);
            }}
          >
            schedule
          </span>
          <span
            class="material-symbols-outlined"
            onClick={(e) => {
              addToLikedVideos(e, video);
            }}
          >
            favorite
          </span>
          <Link to="/playlist" className="sidebar-links-name">
            <span class="material-symbols-outlined">playlist_play</span>
          </Link>
        </div>
      </div>
      <div className="suggested-videos">
        <h3>View similar</h3>
        <ul className="video-pages">
          {suggestedList.map((video) => (
            <li className="videocard" key={video._id}>
              <VideoCard video={video} key={video._id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VideoPage;
