import { useContext, useState, createContext, useEffect } from "react";
import { Playlist } from "../Pages/pages";
import axios from "axios";

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

  return (
    <VideoContext.Provider value={{ allVideos }}>
      {children}
    </VideoContext.Provider>
  );
};
const useVideo = () => useContext(VideoContext);
export { useVideo, VideoProvider };
