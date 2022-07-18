import { useState, useContext, createContext, useReducer } from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import { useVideo } from "./context";
import { useNavigate } from "react-router-dom";
import { ActiveModelSerializer } from "miragejs";
import { videoReducer } from "../reducer/reducer-function";
import Toast from "../Components/Toast";

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
          Toast({ type: "success", message: "Playlist Created" });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Toast({ type: "error", message: "Please login to continue" });
      navigate("/login");
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
          Toast({ type: "success", message: "Added to Playlist" });
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      Toast({ type: "error", message: "Please login to continue" });
      navigate("/login");
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
          Toast({ type: "success", message: "Playlist Deleted" });
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      Toast({ type: "error", message: "Please login to continue" });
      navigate("/login");
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
          Toast({ type: "success", message: "Deleted from Playlist" });
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Toast({ type: "error", message: "Please login to continue" });
      navigate("/login");
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
