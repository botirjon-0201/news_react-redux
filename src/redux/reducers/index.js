import { combineReducers } from "redux";
import news from "./news";
import filter from "./filter";

export default combineReducers({
  news,
  filter,
});
