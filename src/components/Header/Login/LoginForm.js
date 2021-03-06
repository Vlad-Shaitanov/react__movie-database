import React, { Component } from "react";
import CallApi from "../../../api/api";

import AppContextHOC from "../../HOC/AppContextHOC";
import classNames from "classnames";

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      repeatpassword: "",
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
    if (this.state.password.length < 5) {
      errors.password = "Required! Must be 5 characters or more";
    }
    if (this.state.repeatpassword !== this.state.password) {
      errors.repeatpassword = "Should be equal password";
    }

    return errors;
  };

  //Инпут выходит из фокуса
  handleBlur = (event) => {
    const { name } = event.target;
    const errors = this.validateFields();
    const error = errors[name];

    //Если в объекте с ошибками есть какие-либо свойства, меняем состояние
    if (error) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [name]: error,
        },
      }));
    }
  };

  onSubmit = async () => {
    this.setState({
      submitting: true,
    });

    try {
      /*Цепочка запросов:
  	1 - GET-запрос токена
  	2 - POST-запрос, отправляем логин, пароль и токен из предыдущего запроса
  	3- POST-запрос с токеном для получения id сессии
  	*/
      //GET-запрос токена
      // const data = await fetchApi(
      //   `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
      // );
      //  console.log("token", data);

      //POST-запрос, отправляем логин, пароль и токен из предыдущего запроса
      // const result = await fetchApi(
      //   `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       username: this.state.username,
      //       password: this.state.password,
      //       request_token: data.request_token,
      //     }),
      //   }
      // );
      //  console.log("login valid", result);

      //POST-запрос с токеном для получения id сессии
      // const { session_id } = await fetchApi(
      //   `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       request_token: result.request_token,
      //     }),
      //   }
      // );
      // console.log(session_id);

      const data = await CallApi.get("/authentication/token/new");
      console.log("token", data);

      const result = await CallApi.post(
        "/authentication/token/validate_with_login",
        {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: data.request_token,
          },
        }
      );
      console.log("login valid", result);

      const { session_id } = await CallApi.post("/authentication/session/new", {
        body: {
          request_token: result.request_token,
        },
      });
      console.log("session_id", session_id);

      const user = await CallApi.get("/account", {
        params: {
          session_id: session_id,
        },
      });
      console.log("account", user);

      this.setState({
        submitting: false,
      });
      this.props.updateAuth(user, session_id); //Записываем user, id сессии в состояние приложения(App)
    } catch (error) {
      this.setState({
        submitting: false,
        errors: {
          base: error.status_message,
        },
      });
      console.log("error", error);
    }
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

  //Динамическое получение классов для инпутов(подсветка при невалидности)
  getClassForInput = (key) =>
    classNames("form-control", {
      invalid: this.state.errors[key],
    });

  render() {
    const { username, password, repeatpassword, errors, submitting } =
      this.state;
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
              className={this.getClassForInput("username")}
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
              className={this.getClassForInput("password")}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.password}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="username">Повторите пароль</label>
            <input
              type="password"
              className={this.getClassForInput("repeatpassword")}
              id="repeatpassword"
              placeholder="Повторите пароль"
              name="repeatpassword"
              value={repeatpassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatpassword && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {errors.repeatpassword}
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

export default AppContextHOC(LoginForm);

// const LoginFormContainer = (props) => {
//   return (
//     <AppContext.Consumer>
//       {(context) => (
//         <LoginForm
//           updateUser={context.updateUser}
//           updateSessionId={context.updateSessionId}
//           {...props}
//         />
//       )}
//     </AppContext.Consumer>
//   );
// };
//
// /*Подпишем обертку, чтобы она не отображалась в девтулз как анонимная,
// а имела имя. Такой подход упрощает обработку ошибок*/
// LoginFormContainer.displayName = "LoginFormContainer";
//
// export default LoginFormContainer;
