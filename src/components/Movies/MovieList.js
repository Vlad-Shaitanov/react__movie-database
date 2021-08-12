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

  //Получение фильмов
  getMovies = (filters, page) => {
    const { sort_by } = filters;
    //Ссылка
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}`;
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
        });
      });
  };

  componentDidMount() {
    // const {
    //   filters: { sort_by },
    // } = this.props;
    // //Ссылка
    // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
    // fetch(link)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.setState({
    //       movies: data.results,
    //     });
    //   });
    this.getMovies(this.props.filters, this.props.page);
  }

  //При изменении пропсов в компоненте
  // componentWillReceiveProps(nextProps) { //Срабатывает перед рендером
  //   console.log("prevProps", this.props, "nextProps", nextProps);
  //
  //   //Если пропсы изменились
  //   if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
  //     // const {
  //     //   filters: { sort_by },
  //     // } = nextProps;
  //     // //Ссылка
  //     // const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;
  //     // fetch(link)
  //     //   .then((response) => {
  //     //     return response.json();
  //     //   })
  //     //   .then((data) => {
  //     //     this.setState({
  //     //       movies: data.results,
  //     //     });
  //     //   });
  //     this.getMovies(nextProps.filters);
  //   }
  // }

  //При изменении пропсов в компоненте
  componentDidUpdate(prevProps) {
    // console.log("componentDidUpdate", prevProps.page, this.props.page);
    //Срабатывает после рендера
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1); //Второй аргумент означает, что при смене фильтра мы вернемся на 1 страницу
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const { movies } = this.state;
    // console.log("filters", this.props.filters);
    // console.log("render");
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
