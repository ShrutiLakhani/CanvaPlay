import React from "react";
import { useVideo } from "../../context/context";
import "./CategoryList.css";
import { VideoCard } from "../components";

function CategoryList() {
  const {
    setFilteredList,
    setFilteredVideos,
    categories,
    allVideos,
    filterByCategory,
    videoData,
    videoDispatch,
    filteredList,
    setCurrentCategory,
  } = useVideo();
  const { categoryList } = videoData;

  return (
    <ul className="category-list">
      {categoryList.map(({ _id, categoryName }) => {
        return (
          <li
            key={_id}
            className={
              categoryName === videoData.category
                ? "category active"
                : "category"
            }
            onClick={() => setCurrentCategory(categoryName)}
          >
            {categoryName}
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryList;
