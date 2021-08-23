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
