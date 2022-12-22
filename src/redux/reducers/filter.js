import { createReducer } from "@reduxjs/toolkit";
import {
  activeFilterChanged,
  filtersFetched,
  filtersFetching,
  filtersFetchingError,
} from "../actions";

const initialState = {
  filters: [],
  filterLoadingStatus: "sam",
  activeFilter: "all",
};

const filter = createReducer(initialState, (builder) => {
  builder
    .addCase(filtersFetching, (state) => {
      state.filterLoadingStatus = "loading";
    })
    .addCase(filtersFetched, (state, action) => {
      state.filters = action.payload;
      state.filterLoadingStatus = "sam";
    })
    .addCase(filtersFetchingError, (state) => {
      state.filterLoadingStatus = "error";
    })
    .addCase(activeFilterChanged, (state, action) => {
      state.activeFilter = action.payload;
    })
    .addDefaultCase(() => {});
});

export default filter;
