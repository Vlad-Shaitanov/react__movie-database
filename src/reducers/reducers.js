import Cookies from "universal-cookie";

const cookies = new Cookies();

//Первоначальное состояние
const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false,
};

//Редюсер(старое состояние, экшен). В зависимости от типа экшена изменяем состояние
export const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/", //Для всех URL
        maxAge: 2592000, //Длительность хранения
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true,
      };

    case "LOGOUT":
      cookies.remove("session_id"); //Удаляем куку

      //Сбрасываем id сессии и пользователя
      return {
        ...state,
        session_id: null,
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
