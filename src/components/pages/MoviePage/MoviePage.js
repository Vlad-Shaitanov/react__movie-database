import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import CallApi from "../../../api/api";

export default class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      favList: false,
      watchList: false,
    };
  }

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
      movie: {
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        overview,
        genres,
        budget,
        revenue,
      },
      favList,
      watchList,
    } = this.state;

    //backdrop_path - задний фон фильма
    //poster_path - обложка
    // console.log("movie", movie);

    const movieBackground = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
    let genresList = [];

    try {
      genresList = genres
        .map((item) => {
          return item.name;
        })
        .join(", ");
      // console.log(genresList);
    } catch (error) {
      console.log("Error", `${error.name} ${error.message}`);
    }

    return (
      <div className="container pt-5">
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
                <p>Премьера: {release_date} </p>
                <p>{genresList}</p>
                <p>Продолжительность: {runtime} минут(ы) </p>
                <div className="d-flex justify-content-between">
                  <p>Кассовые сборы: ${revenue}</p>
                  <p>Бюджет: ${budget}</p>
                </div>
                <div className="d-flex icons w-25 justify-content-between">
                  <div className="icons__item-bg">
                    <span
                      className="material-icons md-36 yellow"
                      title="В Избранное"
                      onClick={this.toggleFav}
                    >
                      {favList ? "favorite" : "favorite_border"}
                    </span>
                  </div>
                  <div className="icons__item-bg">
                    <span
                      className="material-icons md-36"
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
          <Nav tabs>
            <NavItem>
              <NavLink className="">Подробнее</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="">Видео</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="">Актеры</NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
    );
  }
}
