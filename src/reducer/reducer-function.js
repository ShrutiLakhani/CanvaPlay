export function videoReducer(videoData, action) {
  switch (action.type) {
    case "ALL_CATEGORIES":
      return { ...videoData, categoryList: action.payload };
    case "SET_CATEGORY":
      return { ...videoData, categoryList: action.payload };
    default:
      return { ...videoData };
  }
}
