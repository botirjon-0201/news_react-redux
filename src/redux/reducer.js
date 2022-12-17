const initialState = {
  news: [],
  newsLoadingStatus: "sam",
  filters: [],
  filterLoadingStatus: "sam",
  activeFilter: "all",
  filteredNews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEWS_FETCHING":
      return {
        ...state,
        newsLoadingStatus: "loading",
      };
    case "NEWS_FETCHED":
      return {
        ...state,
        news: action.payload,
        filteredNews:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter(
                (item) => item.category === state.activeFilter
              ),
        newsLoadingStatus: "sam",
      };
    case "NEWS_FETCHING_ERROR":
      return {
        ...state,
        newsLoadingStatus: "error",
      };
    case "NEWS_CREATED":
      const newCreatedNewsList = [...state.news, action.payload];
      return {
        ...state,
        news: newCreatedNewsList,
        filteredNews:
          state.activeFilter === "all"
            ? newCreatedNewsList
            : newCreatedNewsList.filter(
                (item) => item.category === state.activeFilter
              ),
      };
    case "NEWS_DELETED":
      const newNewsList = state.news.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        news: newNewsList,
        filteredNews:
          state.activeFilter === "all"
            ? newNewsList
            : newNewsList.filter(
                (item) => item.category === state.activeFilter
              ),
      };
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

export default reducer;
