import React, { Component } from "react";
import { Header } from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
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
            <Link to="/">All Movies</Link>

            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
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
    user: state.user,
    session_id: state.session_id,
    isAuth: state.isAuth,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
