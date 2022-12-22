import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useHttp from "../../hook/useHttp";

const initialState = {
  filters: [],
  filterLoadingStatus: "sam",
  activeFilter: "all",
};

export const fetchFilter = createAsyncThunk("filter/fetchFilter", async () => {
  const { request } = useHttp();
  return await request(`http://localhost:3001/filters`);
});

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filtersFetching(state) {
      state.filterLoadingStatus = "loading";
    },
    filtersFetched(state, action) {
      state.filters = action.payload;
      state.filterLoadingStatus = "sam";
    },
    filtersFetchingError(state) {
      state.filterLoadingStatus = "error";
    },
    activeFilterChanged(state, action) {
      // shu yerda setTimeOutdan foydalana olamizmi?
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilter.pending, (state) => {
        state.filterLoadingStatus = "loading";
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filterLoadingStatus = "sam";
      })
      .addCase(fetchFilter.rejected, (state) => {
        state.filterLoadingStatus = "error";
      });
  },
});

const { actions, reducer } = filterSlice;
export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions;
