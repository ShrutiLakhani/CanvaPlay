import React from "react";
import { HistoryCard, Sidebar } from "../../Components/components";
import { useLiked, useVideo } from "../../context/context";
import "./History.css";

function History({ video }) {
  const { historyVideo, clearHistory } = useVideo();

  const clearAllHistory = (e, video) => {
    clearHistory(video);
  };
  return (
    <>
      <div className="videolib-wrapper">
        <div className="history-video-pages">
          <Sidebar />
          <div className="recommended-videos">
            {historyVideo.map((video) => (
              <HistoryCard key={video._id} video={video} />
            ))}
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={(e) => {
            clearAllHistory(e, video);
          }}
        >
          Clear History
        </button>
      </div>
    </>
  );
}

export default History;
