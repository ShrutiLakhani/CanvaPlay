export function videoReducer(videoData, action) {
  switch (action.type) {
    case "ALL_CATEGORIES":
      return { ...videoData, categoryList: action.payload };
    case "SET_CATEGORY":
      return { ...videoData, categoryList: action.payload };
    case "SEARCH_FOR":
      return { ...videoData, searchFor: action.payload };
    case "CREATE_PLAYLIST":
    case "DELETE_PLAYLIST":
      return { ...videoData, playlists: action.payload };
    case "ADD_TO_PLAYLIST":
    case "DELETE_FROM_PLAYLIST": {
      const updatedPlaylist = videoData.playlists.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      return { ...videoData, playlists: updatedPlaylist };
    }
    default:
      return { ...videoData };
  }
}
