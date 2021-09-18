import { createStore } from "redux";
import { reducerApp } from "../reducers/reducers";

export const store = createStore(reducerApp);
