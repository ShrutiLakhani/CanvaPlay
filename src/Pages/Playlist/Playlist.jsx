import React from "react";
import { useParams } from "react-router-dom";
import { PlayListCard, Sidebar } from "../../Components/components";
import PlayList from "../../Components/PlayListCard/PlayListCard";
import { useVideo } from "../../context/context";
import { usePlaylist } from "../../context/context";

function PlayListPage() {
  const { playlistId } = useParams();
  const {
    videoData: { playlists },
    videoDispatch,
  } = useVideo();

  const { playlistVideos, setPlaylistVideos } = usePlaylist();

  return (
    <div className="video-pages">
      <Sidebar />
      <div className="recommended-videos">
        {playlists.map((playlist) => (
          <PlayListCard key={playlist._id} video={playlist} />
        ))}
      </div>
    </div>
  );
}

export default PlayListPage;
