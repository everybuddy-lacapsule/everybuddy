export const searchResults = (searchResults = [], action) => {
  if (action.type === "search") {
    return action.listResults;
  } else {
    return searchResults;
  }
};
