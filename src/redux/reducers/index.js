import { combineReducers } from "redux";
import news from "./news_slice";
import filter from "./filter_slice";

export default combineReducers({
  news,
  filter,
});
