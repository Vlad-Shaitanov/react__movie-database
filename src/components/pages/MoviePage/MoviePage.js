import React, { Component } from "react";
import CallApi from "../../../api/api";
import { Tabs } from "../../Movies/Tabs/Tabs";

export default class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      favList: false,
      watchList: false,
    };
  }

  // todo Сменить место хранения состояния

  updateMovie = (movie) => {
    this.setState({
      movie,
    });
  };

  toggleFav = () => {
    this.setState({
      favList: !this.state.favList,
    });
  };

  toggleWatch = () => {
    this.setState({
      watchList: !this.state.watchList,
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
      movie: { backdrop_path, poster_path, title, vote_average, overview },
      favList,
      watchList,
    } = this.state;

    //backdrop_path - задний фон фильма
    //poster_path - обложка
    // console.log("movie", movie);

    const movieBackground = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

    return (
      <div className="container pt-5 pb-5">
        <div
          className="row movpage w-100 mh-100"
          style={{
            backgroundImage: `url(${movieBackground})`,
          }}
        >
          <div className="col">
            <div className="row bg-black bg-opacity-50">
              <div className="col-4 p-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  style={{ maxWidth: "100%" }}
                  className="border rounded-3"
                  alt=""
                />
              </div>
              <div className="col-8 text-light">
                <p className="h4 text-center pt-3">{title}</p>
                <p className="my-5">
                  Рейтинг среди пользователей:{" "}
                  <span className="h4">{vote_average}</span>
                </p>

                <div className="d-flex icons w-25 justify-content-between">
                  <div className="icons__item-bg">
                    <span
                      className="material-icons movie-icon md-36 yellow"
                      title="В Избранное"
                      onClick={this.toggleFav}
                    >
                      {favList ? "favorite" : "favorite_border"}
                    </span>
                  </div>
                  <div className="icons__item-bg">
                    <span
                      className="material-icons movie-icon md-36"
                      title="Смотреть позже"
                      onClick={this.toggleWatch}
                    >
                      {watchList ? "bookmark" : "bookmark_border"}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="mt-3 text-center">Обзор</h4>
                  <p>{overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Tabs movie={movie} />
        </div>
      </div>
    );
  }
}
