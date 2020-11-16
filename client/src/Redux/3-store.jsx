import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import { userToken } from "./2-reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({ userToken });
const logger = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
);
// logger is for console

export default store;
