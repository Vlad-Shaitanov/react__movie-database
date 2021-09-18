import React, { Component } from "react";
import { Header } from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut,
} from "../actions/actions";
import { BrowserRouter, Route, Link } from "react-router-dom";

export const AppContext = React.createContext();
// console.log(AppContext);

export class App extends Component {
  updateAuth = (user, session_id) => {
    this.props.store.dispatch(
      actionCreatorUpdateAuth({
        user,
        session_id,
      })
    );
  };

  //Выход из учетной записи пользователя
  onLogOut = () => {
    this.props.store.dispatch(actionCreatorLogOut());
  };

  componentDidMount() {
    const { store } = this.props;
    const { session_id } = store.getState();
    this.props.store.subscribe(() => {
      console.log("change", this.props.store.getState());

      //forceUpdate(им лучше не пользоваться, но он нужен в текущей ситуации)
      this.forceUpdate();
    });

    // //Считываем id с куки
    // //Если в куках есть запись с id сессии, сразуже обновляем пользователя
    if (session_id) {
      // const accountSuccess = async () => {
      //   try {
      //     const account = await CallApi.get("/account", {
      //       params: {
      //         session_id: session_id,
      //       },
      //     });
      //
      //     this.updateAuth(account, session_id);
      //   } catch (error) {
      //     console.log("error", error);
      //   }
      // };
      // accountSuccess();

      CallApi.get("/account", {
        params: {
          session_id: session_id,
        },
      }).then((user) => {
        this.updateAuth(user, session_id);
      });
    }
  }

  render() {
    // console.log("App props", this.props.store.getState());
    const { user, session_id, isAuth } = this.props.store.getState();
    return isAuth || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            updateAuth: this.updateAuth,
            onLogOut: this.onLogOut,
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

export default App;
