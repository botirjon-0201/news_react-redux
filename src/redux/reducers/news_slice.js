import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  newsLoadingStatus: "sam",
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsFetching(state) {
      state.newsLoadingStatus = "loading";
    },
    newsFetched(state, action) {
      state.newsLoadingStatus = "sam";
      state.news = action.payload;
    },
    newsFetchingError(state) {
      state.newsLoadingStatus = "error";
    },
    newsCreated(state, action) {
      state.news.push(action.payload);
    },
    newsDeleted(state, action) {
      state.news = state.news.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = newsSlice;

export default reducer;
export const {
  newsFetching,
  newsFetched,
  newsFetchingError,
  newsCreated,
  newsDeleted,
} = actions;
