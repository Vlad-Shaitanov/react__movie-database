import React, { Component } from "react";

export class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {},
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
    console.log("on blur");
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
    }
  };

  render() {
    const { username, password, errors } = this.state;
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
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
          >
            Вход
          </button>
        </form>
      </div>
    );
  }
}
