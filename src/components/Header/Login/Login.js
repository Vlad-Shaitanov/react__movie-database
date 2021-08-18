import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";

export class Login extends Component {
  sendPromises = async () => {
    //Получаем request token
    // const getRequestToken = () => {
    //   return new Promise((resolve, reject) => {
    //     fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
    //       .then((response) => {
    //         if (response.status < 400) {
    //           return response.json();
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then((data) => {
    //         resolve(data);
    //       })
    //       .catch((response) => {
    //         response.json().then((error) => {
    //           reject(error);
    //         });
    //       });
    //   });
    // };

    //Создание сессии с логином(проверка валидности логина и пароля)
    // const validateWithLogin = (body) => {
    //   return new Promise((resolve, reject) => {
    //     fetch(
    //       `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //       {
    //         method: "POST",
    //         mode: "cors",
    //         headers: {
    //           "Content-type": "application/json",
    //         },
    //         body: JSON.stringify(body),
    //       }
    //     )
    //       .then((response) => {
    //         if (response.status < 400) {
    //           return response.json();
    //         } else {
    //           throw response;
    //         }
    //       })
    //       .then((data) => {
    //         resolve(data);
    //       })
    //       .catch((response) => {
    //         response.json().then((error) => {
    //           reject(error);
    //         });
    //       });
    //   });
    // };

    // getRequestToken()
    //   .then((data) => {
    //     console.log("request token", data);
    //     return validateWithLogin({
    //       username: "AtteroDominatus",
    //       password: "Ta01Ka01Sa90Go",
    //       request_token: data.request_token,
    //     });
    //   })
    //   .then((data) => {
    //     console.log("Session with login", data);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });

    const fetchApi = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        fetch(url, options)
          .then((response) => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then((data) => {
            resolve(data);
          })
          .catch((response) => {
            response.json().then((error) => {
              reject(error);
            });
          });
      });
    };

    try {
      //GET-запрос токена
      const data = await fetchApi(
        `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
      );
      console.log(data);

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
            username: "AtteroDominatus",
            password: "Ta01Ka01Sa90Go",
            request_token: data.request_token,
          }),
        }
      );
      console.log(result);

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
    } catch (error) {
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
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.sendPromises}
        >
          Login
        </button>
      </div>
    );
  }
}
