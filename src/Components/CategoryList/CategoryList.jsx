import React from "react";
import { useVideo } from "../../context/context";
import "./CategoryList.css";
import { VideoCard } from "../components";

function CategoryList() {
  const {
    setfilteredList,
    categories,
    allVideos,
    filterByCategory,
    videoData,
    videoDispatch,
    filteredList,
  } = useVideo();
  const { categoryList } = videoData;

  return (
    <ul className="category-list">
      {categoryList.map(({ _id, categoryName }) => (
        <li
          key={_id}
          className={
            categoryName === videoData.category ? "category active" : "category"
          }
          onClick={() => filterByCategory(categoryName, allVideos)}
        >
          {categoryName}
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
