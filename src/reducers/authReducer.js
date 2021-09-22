import Cookies from "universal-cookie";

const cookies = new Cookies();

//Первоначальное состояние
const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false,
  favoriteList: [],
  watchList: [],
};

//Редюсер(старое состояние, экшен). В зависимости от типа экшена изменяем состояние
export const authReducer = (state = initialState, action) => {
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

    //Обновление Избранного
    // case "UPDATE_FAVORITE_LIST":
    //   return {
    //     ...state,
    //     favoriteList: action.payload,
    //   };

    case "ADD_TO_FAVORITE_LIST":
      const newItem = action.payload;
      return {
        ...state,
        favoriteList: [...state.favoriteList.slice(), newItem],
      };

    case "REMOVE_FROM_FAVORITE_LIST":
      const id = action.payload.id;
      const itemInState = state.favoriteList.findIndex(
        (item) => item.id === id
      );

      if (state.favoriteList.length < 1) {
        return state;
      } else {
        return {
          ...state,
          favoriteList: [
            ...state.favoriteList.slice(0, itemInState),
            ...state.favoriteList.slice(itemInState + 1),
          ],
        };
      }

    //Обновление списка фильмов, ожидающих просмотра
    case "UPDATE_WATCH_LIST":
      return {
        ...state,
        watchList: action.payload,
      };

    default:
      return state;
  }
};
