import { useState, useContext, createContext } from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import { useVideo } from "./video-context";
import { useNavigate } from "react-router-dom";
import Toast from "../Components/Toast";

const WatchlaterContext = createContext();

const WatchlaterProvider = ({ children }) => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const [watchlistVideos, setWatchlistVideos] = useState([]);

  const addToWatchlist = async (video) => {
    if (loggedIn) {
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
          Toast({ type: "success", message: "Added to Watchlist" });
        }
      } catch (error) {
        console.log("error", error);
        Toast({
          type: "error",
          message: "Oops!Something went wrong. Please try again",
        });
      }
    } else {
      Toast({ type: "error", message: "Please login to continue" });
      navigate("/login");
    }
  };
  const removeFromWatchlist = async (videoId) => {
    if (loggedIn) {
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
          Toast({ type: "success", message: "Removed from Watchlist" });
        }
      } catch (error) {
        console.log("error", error);
        Toast({
          type: "error",
          message: "Oops!Something went wrong. Please try again",
        });
      }
    } else {
      Toast({ type: "error", message: "Please login to continue" });
      navigate("/login");
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
