import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "../reducers/rootReducer";

export const store = createStore(combineReducers, composeWithDevTools());
