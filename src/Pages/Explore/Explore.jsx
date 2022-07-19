import React from "react";
import "./Explore.css";
import { CategoryList, Sidebar, VideoCard } from "../../Components/components";
import { useVideo } from "../../context/context";
function Explore() {
  const {
    allVideos,
    fetchVideos,
    filteredList,
    currentCategory,
    setCurrentCategory,
  } = useVideo();
  const filterByCategory = (category, allVideos) => {
    return category === "All"
      ? [...allVideos]
      : allVideos.filter((video) => video.category === category);
  };
  const result = filterByCategory(currentCategory, allVideos);
  return (
    <>
      <div className="videolib-wrapper">
        <div className="video-pages">
          <Sidebar />
          <div className="recommended-videos">
            <div className="category-container">
              <CategoryList />
            </div>
            <div className="filtered-videos">
              {result.map((video) => (
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
