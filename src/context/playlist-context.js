import { useState, useContext, createContext, useReducer } from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import { useVideo } from "./context";
import { useNavigate } from "react-router-dom";
import { ActiveModelSerializer } from "miragejs";
import { videoReducer } from "../reducer/reducer-function";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const navigate = useNavigate();
  const { userToken, loggedIn } = useAuth();

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
  });

  const createNewPlaylist = async (
    title = "",
    description = "",
    videoDispatch,
    setPlaylist,
    userToken
  ) => {
    if (loggedIn) {
      try {
        const token = localStorage.getItem("userToken");
        const { data, status } = await axios.post(
          "/api/user/playlists",
          { playlist: { title: title, description: description } },
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (status === 201) {
          videoDispatch({
            type: "CREATE_PLAYLIST",
            payload: data.playlists,
          });
          setPlaylist({ title: "", description: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const addToPlaylist = async (playlistId, video, videoDispatch) => {
    if (loggedIn) {
      try {
        const token = localStorage.getItem("userToken");
        const { data, status } = await axios.post(
          `/api/user/playlists/${playlistId}`,
          { video },
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (status === 201 || status === 200) {
          videoDispatch({
            type: "ADD_TO_PLAYLIST",
            payload: data.playlist,
          });
        }
      } catch (error) {
        console.log("error", error);
        //   navigate("/login");
      }
    }
  };
  const removePlaylist = async (playlist, videoDispatch) => {
    if (loggedIn) {
      try {
        const token = localStorage.getItem("userToken");
        const id = playlist._id;
        const response = await axios.delete(`/api/user/playlists/${id}`, {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          videoDispatch({
            type: "DELETE_PLAYLIST",
            payload: response.data.playlists,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const deleteFromPlaylist = async (playlist, video, videoDispatch) => {
    if (loggedIn) {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.delete(
          `/api/user/playlists/${playlist._id}/${video._id}`,
          {
            headers: {
              authorization: userToken,
            },
          }
        );
        if (response.status === 200) {
          videoDispatch({
            type: "DELETE_FROM_PLAYLIST",
            payload: response.data.playlist,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        setPlaylist,
        addToPlaylist,
        removePlaylist,
        showPlaylistModal,
        setShowPlaylistModal,
        deleteFromPlaylist,
        createNewPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);
export { usePlaylist, PlaylistProvider };
