const initSearchResults = {
  search: false,
  searchLocation: { long: 4.8489, lat: 45.75466 },
  searchResults: [],
};

export const searchResults = (searchResults = initSearchResults, action) => {
  if (action.type === "search") {
    return action.results;
  } else if (action.type === "onboardingSearch") {
    return action.resultsOnboarding;
  } else {
    return searchResults;
  }
};

/* Struture of obj searchResults */
/*
{
  searchResults: {},
  searchLocation: [
    {_id: "",
    name: "",
    address:{},
    ...},

    {_id: "",
    name: "",
    address:{}
    ...}
  ],
}
*/
