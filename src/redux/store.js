import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./reducers/index";
import ReduxThunk from "redux-thunk";

// next - dispatchni funksiyasini bajaradi
const stringMiddleware = (store) => (next) => (action) => {
  return typeof action === "string" ? next({ type: action }) : next(action);
};

// // Store enhancer
// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       return typeof action === "string"
//         ? oldDispatch({ type: action })
//         : oldDispatch(action);
//     };
//     return store;
//   };

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(ReduxThunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  // compose(
  // enhancer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);
