import reducer from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";
import stringMiddleware from "../middleware/stringMiddleware";

// Mentorga savol: enhancer, middlewarelardan birini ishlatish kifoyami?
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
