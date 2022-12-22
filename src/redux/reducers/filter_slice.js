import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  filterLoadingStatus: "sam",
  activeFilter: "all",
};

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
});

const { actions, reducer } = filterSlice;
export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions;
