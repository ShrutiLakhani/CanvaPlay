import {
  useContext,
  useState,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { Playlist } from "../Pages/pages";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { videoReducer } from "../reducer/reducer-function";

const VideoContext = createContext();

const initialState = {
  categoryList: [],
  playlists: [],
  video: [],
  searchFor: "",
};

const VideoProvider = ({ children }) => {
  const [videoData, videoDispatch] = useReducer(videoReducer, initialState);
  const [allVideos, setAllVideos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
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

  useEffect(() => {
    categories(videoDispatch);
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

  const categories = async (videoDispatch) => {
    try {
      const response = await axios.get("/api/categories");
      if (response.status === 200) {
        videoDispatch({
          type: "ALL_CATEGORIES",
          payload: response.data.categories,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <VideoContext.Provider
      value={{
        allVideos,
        videoData,
        addToHistory,
        historyVideo,
        deleteFromHistory,
        clearHistory,
        videoDispatch,
        // setFilteredList,
        // filteredList,
        categories,
        // filterByCategory,
        currentCategory,
        setCurrentCategory,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
const useVideo = () => useContext(VideoContext);
export { useVideo, VideoProvider };
