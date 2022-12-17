import { combineReducers } from "redux";
import news from "./news";
import filters from "./filters";

export default combineReducers({
  news,
  filters,
});
