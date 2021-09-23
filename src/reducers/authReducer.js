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
    case "UPDATE_FAVORITE_LIST":
      return {
        ...state,
        favoriteList: action.payload,
      };

    //Обновление списка фильмов, ожидающих просмотра
    case "UPDATE_WATCH_LIST":
      return {
        ...state,
        watchList: action.payload,
      };

    //Добавление фильма в Избранное
    case "ADD_TO_FAVORITE_LIST":
      const newItem = action.payload;
      return {
        ...state,
        favoriteList: [...state.favoriteList.slice(), newItem],
      };

    //Удаление фильма из избранного
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

    //Добавление фильма в Вишлист
    case "ADD_TO_WATCH_LIST":
      const newItemWL = action.payload;
      return {
        ...state,
        watchList: [...state.watchList.slice(), newItemWL],
      };

    //Удаление фильма из Вишлиста
    case "REMOVE_FROM_WATCH_LIST":
      const idWL = action.payload.id;
      const itemInWL = state.watchList.findIndex((item) => item.id === idWL);

      if (state.watchList.length < 1) {
        return state;
      } else {
        return {
          ...state,
          watchList: [
            ...state.watchList.slice(0, itemInWL),
            ...state.watchList.slice(itemInWL + 1),
          ],
        };
      }

    default:
      return state;
  }
};
