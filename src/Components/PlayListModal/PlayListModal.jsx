import React from "react";
import { addVideoToPlaylistHandler } from "../../backend/controllers/PlaylistController";
import { usePlaylist, useVideo } from "../../context/context";
import PlayList from "../PlayListCard/PlayListCard";
import "./PlayListModal.css";

function PlaylistModal({ video }) {
  const {
    videoDispatch,
    videoData: { playlists },
  } = useVideo();

  const { playlist, setPlaylist, showPlaylistModal, setShowPlaylistModal } =
    usePlaylist();

  const handleModal = () => {
    setShowPlaylistModal((prev) => !prev);
  };

  const { createNewPlaylist, addToPlaylist } = usePlaylist();

  const videoInPlaylist = (playlist) => {
    return playlist.videos.some((videoid) => videoid._id === video._id);
  };

  return (
    <>
      <div className="playlist-modal">
        <div className="modal-title">
          <h3>My Playlist</h3>
          <span
            class="material-symbols-outlined"
            onClick={() => {
              setShowPlaylistModal((prev) => !prev);
            }}
          >
            cancel
          </span>
        </div>
        <ul className="playlists">
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              onClick={() =>
                videoInPlaylist(playlist)
                  ? console.log("Video already in playlist")
                  : addToPlaylist(playlist._id, video, videoDispatch)
              }
            >
              <label className="playlist">
                {videoInPlaylist(playlist) ? (
                  <span class="material-symbols-outlined">check_circle</span>
                ) : (
                  <span class="material-symbols-outlined">add_circle</span>
                )}

                {playlist.title}
              </label>
            </li>
          ))}
        </ul>

        <div className="playlist-input">
          <input
            type="text"
            placeholder="Create Playlist"
            className="title"
            value={playlist.title}
            onChange={(e) =>
              setPlaylist((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <span
            class="material-symbols-outlined playlist-modal-icon"
            onClick={() =>
              createNewPlaylist(
                playlist.title,
                playlist.description,
                videoDispatch,
                setPlaylist
              )
            }
          >
            add_circle
          </span>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default PlaylistModal;
