const initialState = {
  news: [],
  newsLoadingStatus: "sam",
};

const news = (state = initialState, action) => {
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
        newsLoadingStatus: "sam",
      };
    case "NEWS_FETCHING_ERROR":
      return {
        ...state,
        newsLoadingStatus: "error",
      };
    case "NEWS_CREATED":
      return {
        ...state,
        news: [...state.news, action.payload],
      };
    case "NEWS_DELETED":
      return {
        ...state,
        news: state.news.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default news;
