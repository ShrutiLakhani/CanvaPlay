import React from "react";
import { LikedVideoCard, Sidebar } from "../../Components/components";
import { useLiked } from "../../context/like-context";

function Liked() {
  const { likedList } = useLiked();
  return (
    <>
      <div className="videolib-wrapper">
        <div className="video-pages">
          <Sidebar />
          <div className="recommended-videos">
            {likedList.map((video) => (
              <LikedVideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Liked;
