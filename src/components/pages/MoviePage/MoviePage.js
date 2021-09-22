import React, { Component } from "react";
import { connect } from "react-redux";
import CallApi from "../../../api/api";
import { Tabs } from "../../Movies/Tabs/Tabs";
import {
  actionCreatorUpdateFavoriteList,
  actionCreatorAddToFavoriteList,
  actionCreatorRemoveFromFavoriteList,
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

  // todo Сменить место хранения состояния

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
    let id = 0;
    const indx = this.props.favoriteList.findIndex(
      (item) => item.id === movie.id
    );
    console.log("index", indx);

    //  indx >= 0
    if (id === movie.id) {
      this.toggleFav();
      CallApi.delete(`/account/${this.props.account.id}/favorite`, {
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
        id = 0;
        console.log("id", id);
      });
    } else if (id === 0) {
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
        id = movie.id;
        console.log("id", id);
      });
    }
    this.toggleFav();

    // CallApi.post(`/account/${this.props.account.id}/favorite`, {
    //   params: {
    //     session_id: this.props.session_id,
    //   },
    //   body: {
    //     media_type: "movie",
    //     media_id: movie.id,
    //     favorite: true,
    //   },
    // }).then(() => {
    //   this.props.updateFavoriteList(movie);
    //   id = movie.id;
    //   console.log("id", id);
    // });

    console.log("FavL", this.props.favoriteList);
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
        // this.updateFavList(movie);
        // console.log("account", this.props.account);
        // console.log("FavL", this.props.favoriteList);
        // console.log("WatchL", this.props.watchList);
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
      favIcon,
      watchIcon,
    } = this.state;

    // console.log("Movie props", this.props.account);

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
                      // onClick={this.toggleFav}
                      onClick={() => this.updateFavList(this.state.movie)}
                    >
                      {favIcon ? "favorite" : "favorite_border"}
                    </span>
                  </div>
                  <div className="icons__item-bg">
                    <span
                      className="material-icons movie-icon md-36"
                      title="Смотреть позже"
                      onClick={this.toggleWatch}
                    >
                      {watchIcon ? "bookmark" : "bookmark_border"}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
