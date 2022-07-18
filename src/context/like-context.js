import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-context";
import axios from "axios";
import Toast from "../Components/Toast";

const LikedContext = createContext();

const LikedProvider = ({ children }) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const [likedList, setLikedList] = useState([]);

  const addToLikeList = async (video) => {
    if (loggedIn) {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.post(
          "/api/user/likes",
          { video },
          { headers: { authorization: token } }
        );
        if (response.status === 201) {
          setLikedList(response.data.likes);
          Toast({ type: "success", message: "Added to Liked Videos" });
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

  const removeFromLikedList = async (videoId) => {
    if (loggedIn) {
      try {
        const token = localStorage.getItem("userToken");
        const { data, status } = await axios.delete(
          `/api/user/likes/${videoId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (status === 200) {
          setLikedList(data.likes);
          Toast({ type: "success", message: "Removed from Liked Videos" });
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
    <LikedContext.Provider
      value={{ addToLikeList, likedList, removeFromLikedList }}
    >
      {children}
    </LikedContext.Provider>
  );
};

const useLiked = () => useContext(LikedContext);
export { LikedProvider, useLiked };
