import React from "react";
import { WatchlaterCard, Sidebar } from "../../Components/components";
import { useVideo, useWatchLater } from "../../context/context";
function Watchlater() {
  const { watchlistVideos } = useWatchLater();
  return (
    <>
      <div className="videolib-wrapper">
        <h2>Recommended</h2>
        <div className="video-pages">
          <Sidebar />
          <div className="recommended-videos">
            {watchlistVideos.map((video) => (
              <WatchlaterCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Watchlater;
