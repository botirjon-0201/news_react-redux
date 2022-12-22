import { createReducer } from "@reduxjs/toolkit";
import {
  newsCreated,
  newsDeleted,
  newsFetched,
  newsFetching,
  newsFetchingError,
} from "../actions";

const initialState = {
  news: [],
  newsLoadingStatus: "sam",
};

const news = createReducer(initialState, (builder) => {
  builder
    .addCase(newsFetching, (state) => {
      state.newsLoadingStatus = "loading";
    })
    .addCase(newsFetched, (state, action) => {
      state.newsLoadingStatus = "sam";
      state.news = action.payload;
    })
    .addCase(newsFetchingError, (state) => {
      state.newsLoadingStatus = "error";
    })
    .addCase(newsCreated, (state, action) => {
      state.news.push(action.payload);
    })
    .addCase(newsDeleted, (state, action) => {
      state.news = state.news.filter((item) => item.id !== action.payload);
    })
    .addDefaultCase(() => {});
});

export default news;
