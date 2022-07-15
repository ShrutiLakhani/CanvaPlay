import React from "react";
import { useParams } from "react-router-dom";
import "./PlayListPage.css";
import {
  PlayListCard,
  Sidebar,
  PlayListModal,
  VideoCard,
} from "../../Components/components";
import PlayList from "../../Components/PlayListCard/PlayListCard";
import { useVideo } from "../../context/context";
import { usePlaylist } from "../../context/context";

function PlayListPage() {
  const { playlistId, videoId } = useParams();
  const {
    videoData: { playlists },
    videoDispatch,
  } = useVideo();

  const { deleteFromPlaylist } = usePlaylist();
  const findPlaylist = playlists.find((playlist) => playlist._id === videoId);

  return (
    <div className="video-pages">
      <Sidebar />
      <div className="recommended-videos">
        {findPlaylist.videos.map((video) => (
          <>
            <div className="playlist-container">
              <VideoCard key={video._id} video={video} />
              <span
                class="material-symbols-outlined playlist-close-btn"
                onClick={() =>
                  deleteFromPlaylist(findPlaylist, video, videoDispatch)
                }
              >
                cancel
              </span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default PlayListPage;
