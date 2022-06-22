import { useContext, useState, createContext, useEffect } from "react";
import { Playlist } from "../Pages/pages";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VideoContext = createContext();

const initialState = {
  watchlist: [],
  playlist: [],
  likedList: [],
  history: [],
  categoryList: "All",
  searchFor: "",
  sortBy: "",
};

const VideoProvider = ({ children }) => {
  const [allVideos, setAllVideos] = useState([]);
  const [historyVideo, setHistoryVideo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, status } = await axios.get("/api/videos");
        if (status === 200) {
          setAllVideos(data.videos);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchVideos();
  }, []);

  const addToHistory = async (video) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data, status } = await axios.post(
        "/api/user/history",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 201) {
        setHistoryVideo(data.history);
      }
    } catch (error) {
      console.log("error", error);
      // navigate("/login");
    }
  };

  const deleteFromHistory = async (videoId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data, status } = await axios.delete(
        `/api/user/history/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        setHistoryVideo(data.history);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const clearHistory = async (video) => {
    const token = localStorage.getItem("userToken");
    try {
      const { data, status } = await axios.delete("/api/user/history/all", {
        headers: {
          authorization: token,
        },
      });
      if (status === 200) {
        setHistoryVideo([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        addToHistory,
        historyVideo,
        deleteFromHistory,
        clearHistory,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
const useVideo = () => useContext(VideoContext);
export { useVideo, VideoProvider };
