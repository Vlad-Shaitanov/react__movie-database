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
    const {
      filters: { sort_by },
    } = this.props;
    //Ссылка
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
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
    console.log("filters", this.props.filters);
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