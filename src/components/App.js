import React, { Component } from "react";
import { Header } from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route, Link } from "react-router-dom";

const cookies = new Cookies();

export const AppContext = React.createContext();
// console.log(AppContext);

export class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
    };
  }

  //Обновление данных о пользователе
  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  //Обновление данных о сессии
  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      //Записываем id сессии в куки
      path: "/", //Для всех URL
      maxAge: 2592000, //Длительность хранения
    });
    this.setState({
      session_id,
    });
  };

  //Выход из учетной записи пользователя
  onLogOut = () => {
    cookies.remove("session_id"); //Удаляем куку

    //Сбрасываем id сессии и пользователя
    this.setState({
      session_id: null,
      user: null,
    });
  };

  componentDidMount() {
    //Считываем id с куки
    //Если в куках есть запись с id сессии, сразуже обновляем пользователя
    const session_id = cookies.get("session_id");

    if (session_id) {
      // fetchApi(
      //   `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      // ).then((user) => {
      //   this.updateUser(user);
      // });
      const accountSuccess = async () => {
        try {
          const account = await CallApi.get("/account", {
            params: {
              session_id: session_id,
            },
          });

          this.updateUser(account);
          this.updateSessionId(session_id);
        } catch (error) {
          console.log("error", error);
        }
      };
      accountSuccess();
    }
  }

  render() {
    const { user, session_id } = this.state;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            updateSessionId: this.updateSessionId,
            updateUser: this.updateUser,
            onLogOut: this.onLogOut,
          }}
        >
          <div>
            <Header user={user} />
            <Link to="/">All Movies</Link>
            <Link to="/movie" style={{ display: "block" }}>
              Movie Page
            </Link>
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
