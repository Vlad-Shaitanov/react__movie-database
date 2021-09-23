import React, { Component } from "react";
import { connect } from "react-redux";
import CallApi from "../../../api/api";
import { Tabs } from "../../Movies/Tabs/Tabs";
import {
  actionCreatorUpdateFavoriteList,
  actionCreatorAddToFavoriteList,
  actionCreatorRemoveFromFavoriteList,
  actionCreatorAddToWatchList,
  actionCreatorRemoveFromWatchList,
} from "../../../actions/actions";

class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      favIcon: false,
      watchIcon: false,
    };
  }

  updateMovie = (movie) => {
    this.setState({
      movie,
    });
  };

  toggleFav = () => {
    this.setState({
      favIcon: !this.state.favIcon,
    });
  };

  toggleWatch = () => {
    this.setState({
      watchIcon: !this.state.watchIcon,
    });
  };

  updateFavList = (movie) => {
    //Проверяем, есть фильм уже в списке
    const index = this.props.favoriteList.find((item) => item.id === movie.id);
    // console.log("index", index);

    if (index) {
      //Удаление фильма из избранного
      this.toggleFav();
      CallApi.post(`/account/${this.props.account.id}/favorite`, {
        params: {
          session_id: this.props.session_id,
          language: "ru-RU",
        },
        body: {
          media_type: "movie",
          media_id: movie.id,
          favorite: false,
        },
      }).then(() => {
        this.props.removeFromFavoriteList(movie);
      });
    } else if (!index) {
      //Добавление фильма в избранное
      this.toggleFav();
      CallApi.post(`/account/${this.props.account.id}/favorite`, {
        params: {
          session_id: this.props.session_id,
          language: "ru-RU",
        },
        body: {
          media_type: "movie",
          media_id: movie.id,
          favorite: true,
        },
      }).then(() => {
        this.props.addToFavoriteList(movie);
        this.toggleFav();
      });
    }
    console.log("FavL", this.props.favoriteList);
  };

  updateWatchList = (movie) => {
    //Проверяем, есть фильм уже в списке
    const index = this.props.watchList.find((item) => item.id === movie.id);
    // console.log("index", index);

    if (index) {
      //Удаление фильма из вишлиста
      this.toggleWatch();
      CallApi.post(`/account/${this.props.account.id}/watchlist`, {
        params: {
          session_id: this.props.session_id,
          language: "ru-RU",
        },
        body: {
          media_type: "movie",
          media_id: movie.id,
          watchlist: false,
        },
      }).then(() => {
        this.props.removeFromWatchList(movie);
      });
    } else if (!index) {
      //Добавление фильма в вишлист
      this.toggleWatch();
      CallApi.post(`/account/${this.props.account.id}/watchlist`, {
        params: {
          session_id: this.props.session_id,
          language: "ru-RU",
        },
        body: {
          media_type: "movie",
          media_id: movie.id,
          watchlist: true,
        },
      }).then(() => {
        this.props.addToWatchList(movie);
        this.toggleWatch();
      });
    }
    console.log("WatchL", this.props.watchList);
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
    const {
      movie,
      movie: { backdrop_path, poster_path, title, vote_average, overview },
    } = this.state;

    //Выбранный фильм уже есть в списке Избранного
    let favFlag = this.props.favoriteList.find((item) => item.id === movie.id);

    //Выбранный фильм уже есть в списке ожидания к просмотру
    let watchFlag = this.props.watchList.find((item) => item.id === movie.id);

    //Задний фон страницы выбранного фильма
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
                      title={favFlag ? "В избранном" : "Добавить в Избранное"}
                      onClick={() => this.updateFavList(this.state.movie)}
                    >
                      {favFlag ? "favorite" : "favorite_border"}
                    </span>
                  </div>
                  <div className="icons__item-bg">
                    <span
                      className="material-icons movie-icon md-36"
                      title={watchFlag ? "Смотреть позже" : "В списке ожидания"}
                      onClick={() => this.updateWatchList(this.state.movie)}
                    >
                      {watchFlag ? "bookmark" : "bookmark_border"}
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

const mapStateToProps = (state) => {
  return {
    favoriteList: state.auth.favoriteList,
    watchList: state.auth.watchList,
    account: state.auth.user,
    session_id: state.auth.session_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateFavoriteList: (movie) => {
    //   dispatch(actionCreatorUpdateFavoriteList(movie));
    // },
    addToFavoriteList: (movie) => {
      dispatch(actionCreatorAddToFavoriteList(movie));
    },
    removeFromFavoriteList: (movie) => {
      dispatch(actionCreatorRemoveFromFavoriteList(movie));
    },
    addToWatchList: (movie) => {
      dispatch(actionCreatorAddToWatchList(movie));
    },
    removeFromWatchList: (movie) => {
      dispatch(actionCreatorRemoveFromWatchList(movie));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
