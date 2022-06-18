import { useState, useContext, createContext } from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import { useVideo } from "./context";
import { useNavigate } from "react-router-dom";

const WatchlaterContext = createContext();

const WatchlaterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [watchlistVideos, setWatchlistVideos] = useState([]);

  const addToWatchlist = async (video) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data, status } = await axios.post(
        "/api/user/watchlater",
        { video },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 201) {
        setWatchlistVideos(data.watchlater);
      }
    } catch (error) {
      console.log("error", error);
      navigate("/login");
    }
  };
  const removeFromWatchlist = async (videoId) => {
    try {
      const token = localStorage.getItem("userToken");
      const { data, status } = await axios.delete(
        `/api/user/watchlater/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        setWatchlistVideos(data.watchlater);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <WatchlaterContext.Provider
      value={{
        watchlistVideos,
        setWatchlistVideos,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchlaterContext);
export { useWatchLater, WatchlaterProvider };
