import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import Cookies from "universal-cookie";
import { createStore } from "redux";

const cookies = new Cookies();

const actionCreatorUpdateAuth = (payload) => {
  return {
    type: "UPDATE_AUTH",
    payload,
  };
};

const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  // isAuth: false,
};

//Редюсер(старое состояние, экшен). В зависимости от типа экшена изменяем состояние
const reducerApp = (state = initialState, action) => {
  // console.log("reducerApp", state, action);
  switch (action.type) {
    case "UPDATE_AUTH":
      cookies.set("session_id", action.payload.session_id, {
        //Записываем id сессии в куки
        path: "/", //Для всех URL
        maxAge: 2592000, //Длительность хранения
      });
      //Возвращаем новое состояние
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        // isAuth: true,
      };
    default:
      return state;
  }
};

const store = createStore(reducerApp);

store.subscribe(() => {
  console.log("change", store.getState());
});

store.dispatch(
  actionCreatorUpdateAuth({
    user: {
      name: "AtteroDominatus",
    },
    session_id: "text",
  })
);
// console.log("After update auth", store.getState());

ReactDOM.render(<App store={store} />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
