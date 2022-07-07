import React from "react";
import "./Explore.css";
import { CategoryList, Sidebar, VideoCard } from "../../Components/components";
import { useVideo } from "../../context/context";
function Explore() {
  const { allVideos, fetchVideos, filteredList } = useVideo();
  return (
    <>
      <div className="videolib-wrapper">
        {/* <h2>Recommended</h2> */}
        <div className="video-pages">
          <Sidebar />
          <div className="recommended-videos">
            <div>
              <CategoryList />
            </div>
            <div className="filtered-videos">
              {filteredList.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Explore;
