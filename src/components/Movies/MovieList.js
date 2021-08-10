import React, { Component } from "react";
import { MovieItem } from "./MovieItem";
import { API_URL, API_KEY_3, API_KEY_4 } from "../../api/api";

export class MoviesList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    //Ссылка
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
        });
      });
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map((movie) => {
          return (
            <div className="col-6 mb-4" key={movie.id}>
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
