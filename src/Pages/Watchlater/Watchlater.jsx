import React from "react";
import { WatchlaterCard, Sidebar } from "../../Components/components";
import { useVideo } from "../../context/video-context";
function Watchlater() {
  const { allVideos } = useVideo();
  return (
    <>
      <div className="videolib-wrapper">
        <h2>Recommended</h2>
        <div className="video-pages">
          <Sidebar />
          <div className="recommended-videos">
            {allVideos.map((video) => (
              <WatchlaterCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Watchlater;
