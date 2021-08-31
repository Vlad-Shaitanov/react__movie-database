import queryString from "query-string";
export const API_URL = "https://api.themoviedb.org/3";
export const API_KEY_3 = "8a28197c6f83cb7490f3259dfb3f55c1";
export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTI4MTk3YzZmODNjYjc0OTBmMzI1OWRmYjNmNTVjMSIsInN1YiI6IjYxMGQ2ODlhOTMxZWExMDA3M2M0NzBiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eE-RcLbY7li4SxToEyVraiQZeONg-zqK-y9O8uUmjTE";

export const fetchApi = (url, options = {}) => {
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

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    //url = "/discover/movie"
    /*params = {
	  language: "ru-RU",
		  sort_by: sort_by,
		  page: page,
		  primary_release_year: primary_release_year,
	  }*/
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  }

  static delete(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  }
}
// todo Добавить метод delete в CallApi
// todo Перевести все запросы на CallApi
