import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MovieItem extends Component {
  constructor() {
    super();

    this.state = {
      icons: {
        favorite: false, //По умолчанию иконки избранного вишлиста неактивны
        bookmark: false,
      },
    };
  }

  toggleFavIcon = () => {
    this.setState((prevState) => ({
      icons: {
        ...this.state.icons,
        favorite: !this.state.icons.favorite,
      },
    }));
  };

  toggleBookmarkIcon = () => {
    this.setState((prevState) => ({
      icons: {
        ...this.state.icons,
        bookmark: !this.state.icons.bookmark,
      },
    }));
  };

  // todo Подумать над местом хранения состояния

  render() {
    const { item } = this.props;
    const {
      icons: { favorite, bookmark },
    } = this.state;
    const imagePath = item.backdrop_path || item.poster_path;
    // console.log(item);
    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ""}
          alt=""
        />
        <div className="card-body">
          <div className="card-icons">
            <span
              className="material-icons"
              title="В Избранное"
              onClick={this.toggleFavIcon}
            >
              {/*star_border*/}
              {favorite ? "star" : "star_border"}
            </span>
            <span
              className="material-icons"
              title="Смотреть позже"
              onClick={this.toggleBookmarkIcon}
            >
              {/*bookmark_border*/}
              {bookmark ? "bookmark" : "bookmark_border"}
            </span>
          </div>
          <Link className="card-title" to={`/movie/${item.id}`}>
            {item.title}
          </Link>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}
