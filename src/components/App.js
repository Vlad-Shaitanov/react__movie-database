import React, { Component } from "react";
import { Header } from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { FavoritePage } from "./pages/FavoritePage/FavoritePage";
import { WatchLaterPage } from "./pages/WatchLaterPage/WatchLaterPage";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
  actionCreatorUpdateFavoriteList,
  actionCreatorUpdateWatchList,
} from "../actions/actions";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";

export const AppContext = React.createContext();
// console.log(AppContext);

class App extends Component {
  // updateAuth = (user, session_id) => {
  //   this.props.store.dispatch(
  //     actionCreatorUpdateAuth({
  //       user,
  //       session_id,
  //     })
  //   );
  // };

  //Выход из учетной записи пользователя
  onLogOut = () => {
    this.props.store.dispatch(actionCreatorLogOut());
  };

  //Получение списка избранных фильмов
  getFavoriteList = ({ user, session_id }) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then((data) => {
      // console.log("favorite Movies", data.results);
      this.props.updateFavoriteList(data.results);
    });
  };

  //Получение списка фильмов для отложенного просмотра
  getWatchList = ({ user, session_id }) => {
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then((data) => {
      // console.log("Watch Movies", data.results);
      this.props.updateWatchList(data.results);
    });
  };

  componentDidMount() {
    const { session_id } = this.props;

    //Считываем id с куки
    //Если в куках есть запись с id сессии, сразу же обновляем пользователя
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id,
        },
      }).then((user) => {
        this.props.updateAuth(user, session_id);
        this.getFavoriteList({ user, session_id });
        this.getWatchList({ user, session_id });
      });
    }
  }

  render() {
    console.log("App props", this.props);
    const { user, session_id, isAuth, updateAuth, onLogOut } = this.props;
    return isAuth || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            updateAuth,
            onLogOut,
          }}
        >
          <div>
            <Header user={user} />
            <div className="container mt-3 d-flex justify-content-between">
              <Link to="/">Все фильмы</Link>
              <Link to="/account/favorite">Избранное</Link>
              <Link to="/account/watchlist">Смотреть позже</Link>
            </div>

            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/account/favorite" component={FavoritePage} />
            <Route path="/account/watchlist" component={WatchLaterPage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
      <p>...Loading</p>
    );
  }
}

//Чтение состояния
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    isAuth: state.auth.isAuth,
  };
};

//Передача события
const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (user, session_id) =>
      dispatch(
        actionCreatorUpdateAuth({
          user,
          session_id,
        })
      ),
    onLogOut: () => dispatch(actionCreatorLogOut()),
    updateFavoriteList: (movies) =>
      dispatch(actionCreatorUpdateFavoriteList(movies)),
    updateWatchList: (movies) => dispatch(actionCreatorUpdateWatchList(movies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
