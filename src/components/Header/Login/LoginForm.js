import React, { Component } from "react";
import { API_KEY_3, API_URL, fetchApi } from "../../../api/api";

export class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {},
      submitting: false, //Была ли отправлена форма
    };
  }

  //Изменения в инпутах
  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState((prevState) => ({
      [name]: value, //Обновляем поле
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null, //Убираем уведомление о пустой строке
      },
    }));
  };

  //Валидация полей в форме
  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Not Empty";
    }

    return errors;
  };

  //Инпут выходит из фокуса
  handleBlur = () => {
    const errors = this.validateFields();

    //Если в объекте с ошибками есть какие-либо свойства, меняем состояние
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
  };

  onSubmit = async () => {
    this.setState({
      submitting: true,
    });

    try {
      //GET-запрос токена
      const data = await fetchApi(
        `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
      );
      console.log("token", data);

      //POST-запрос, отправляем логин, пароль и токен из предыдущего запроса
      const result = await fetchApi(
        `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          }),
        }
      );
      console.log("login valid", result);

      //POST-запрос с токеном для получения id сессии
      const { session_id } = await fetchApi(
        `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            request_token: result.request_token,
          }),
        }
      );
      console.log(session_id);

      this.props.updateSessionId(session_id); //Записываем id сессии в состояние приложения(App)
      const account = await fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      );
      console.log("account", account);

      this.props.updateUser(account);
      this.setState({
        submitting: false,
      });
    } catch (error) {
      this.setState({
        submitting: false,
        errors: {
          base: error.status_message,
        },
      });
      console.log("error", error);
    }

    /*Цепочка запросов:
  	1 - GET-запрос токена
  	2 - POST-запрос, отправляем логин, пароль и токен из предыдущего запроса
  	3- POST-запрос с токеном для получения id сессии
  	*/
    // fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //   .then((data) => {
    //     console.log("request token", data);
    //
    //     return fetchApi(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           username: "AtteroDominatus",
    //           password: "Ta01Ka01Sa90Go",
    //           request_token: data.request_token,
    //         }),
    //       }
    //     );
    //   })
    //   .then((data) => {
    //     console.log("Session with login", data);
    //     return fetchApi(
    //       `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           request_token: data.request_token,
    //         }),
    //       }
    //     );
    //   })
    //   .then((data) => {
    //     console.log("Session", data);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  onLogin = (event) => {
    event.preventDefault();

    const errors = this.validateFields();

    //Если в объекте с ошибками есть какие-либо свойства, меняем состояние
    if (Object.keys(errors).length > 0) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    } else {
      this.onSubmit();
    }
  };

  render() {
    const { username, password, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group mb-3">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.username}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div
              className="invalid-feedback text-center mt-3"
              style={{ display: "block" }}
            >
              {errors.base}
            </div>
          )}
        </form>
      </div>
    );
  }
}