import React, { Component } from "react";
import CallApi from "../../../api/api";

export default class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
    };
  }

  updateMovie = (movie) => {
    this.setState({
      movie,
    });
  };

  componentDidMount() {
    const getMovieId = async () => {
      try {
        const movie = await CallApi.get(
          `/movie/${this.props.match.params.id}`,
          {
            params: {
              language: "ru-RU",
            },
          }
        );

        this.updateMovie(movie);
      } catch (error) {
        console.log("error", error);
      }
    };
    getMovieId();
  }

  render() {
    // console.log(this.props);
    const {
      movie,
      movie: {
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        overview,
        genres,
      },
    } = this.state;

    //backdrop_path - задний фон фильма
    //poster_path - обложка
    console.log("movie", movie);

    const movieBackground = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
    // let arr = [];
    // arr.push(genres);
    // console.log(arr);
    // arr.map((item) => console.log("item", item));
    return (
      <div className="container pt-5">
        <div
          className="row movpage w-100 mh-100"
          style={{
            backgroundImage: `url(${movieBackground})`,
          }}
        >
          <div className="col">
            <div className="row bg-black bg-opacity-25">
              <div className="col-4 p-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  style={{ maxWidth: "100%" }}
                  className="border rounded-3"
                />
              </div>
              <div className="col-6 text-light">
                <p className="h4">{title}</p>
                <p>Премьера: {release_date} </p>
                <span>Продолжительность: {runtime} минут(ы) </span>
                <div>
                  <h4>Обзор</h4>
                  <p>{overview}</p>
                  <p>{}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
