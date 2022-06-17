import React from "react";
import "./Explore.css";
import { Sidebar, VideoCard } from "../../Components/components";
import { useVideo } from "../../context/context";
function Explore() {
  console.log("comes");
  const { allVideos, fetchVideos } = useVideo();
  console.log(allVideos);
  return (
    <>
      <div className="videolib-wrapper">
        <h2>Recommended</h2>
        <div className="video-pages">
          <Sidebar />
          <div className="recommended-videos">
            {allVideos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Explore;
