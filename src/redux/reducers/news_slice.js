import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import useHttp from "../../hook/useHttp";

const initialState = {
  news: [],
  newsLoadingStatus: "sam",
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const { request } = useHttp();
  return await request(`http://localhost:3001/news`);
});

export const SelectFilteredNews = createSelector(
  (state) => state.filter.activeFilter,
  (state) => state.news.news,
  (activeFilter, news) => {
    return activeFilter === "all"
      ? news
      : news.filter((item) => item.category === activeFilter);
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsLoadingStatus = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsLoadingStatus = "sam";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

export default newsSlice.reducer;
export const {
  newsFetching,
  newsFetched,
  newsFetchingError,
  newsCreated,
  newsDeleted,
} = newsSlice.actions;
