import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LikedContext = createContext();

const LikedProvider = ({ children }) => {
  const navigate = useNavigate();
  const [likedList, setLikedList] = useState([]);

  const addToLikeList = async (video) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "/api/user/likes",
        { video },
        { headers: { authorization: token } }
      );
      if (response.status === 201) {
        setLikedList(response.data.likes);
      }
    } catch (error) {
      console.log("error", error);
      navigate("/login");
    }
  };

  const removeFromLikedList = async (videoId) => {
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
      }
    } catch (error) {
      console.log("error", error);
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
