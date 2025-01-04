import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducer from "./task";


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
