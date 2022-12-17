const initialState = {
  filters: [],
  filterLoadingStatus: "sam",
  activeFilter: "all",
  filteredNews: [],
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case "FILTERS_FETCHING":
      return {
        ...state,
        filterLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filterLoadingStatus: "sam",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filterLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
        filteredNews:
          action.payload === "all"
            ? state.news
            : state.news.filter((item) => item.category === action.payload),
      };
    default:
      return state;
  }
};

export default filters;
