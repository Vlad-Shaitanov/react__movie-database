import React, { Component } from "react";
import { Filters } from "./Filters/Filters";
import { Header } from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import MoviesList from "./Movies/MovieList.js";

const cookies = new Cookies();

export const AppContext = React.createContext();
// console.log(AppContext);

export class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: "vote_average.desc",
        primary_release_year: toString(new Date().getFullYear()),
        with_genres: [],
      },
      page: 1,
      total_pages: "",
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

  onChangeFilters = (event) => {
    // const newFilters = {
    //    ...this.state.filters,
    //    [event.target.name]: event.target.value
    // };
    this.setState((prevState) => ({
      filters: {
        ...this.state.filters,
        [event.target.name]: event.target.value,
      },
    }));
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    // console.log(page);
    this.setState({
      page: page,
      total_pages: total_pages,
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
    const { filters, page, total_pages, user, session_id } = this.state;
    return (
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
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      page={page}
                      total_pages={total_pages}
                      filters={filters}
                      onChangeFilters={this.onChangeFilters}
                      onChangePagination={this.onChangePagination}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
