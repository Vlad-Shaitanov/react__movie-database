import React, { Component } from "react";
import { MovieItem } from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import _ from "lodash";
import queryString from "query-string";

export class MoviesList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  //Получение фильмов
  getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year,
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");

    // const getQueryStringParams = object => {
    //   let string = "";
    //   for (let key in object) {
    //     string = string + `&${key}=${object[key]}`;
    //   }
    //   return "?" + string.substring(1, string.length);
    // };

    // getQueryStringParams(queryString);
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`;

    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.props.onChangePagination({
          page: data.page,
          total_pages: data.total_pages,
        });

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
  //	if (nextProps.activeTab !== this.props.activeTab) {
  //     this.setState({
  //       tab: nextProps.activeTab
  //     });
  //   }
  // }

  // static getDerrivedStateFromProps(props, state) {
  //   return {
  //     tab: props.activeTab
  //   };
  // }

  //При изменении пропсов в компоненте
  componentDidUpdate(prevProps) {
    // console.log("componentDidUpdate", prevProps.page, this.props.page);
    //Срабатывает после рендера
    if (
      !_.isEqual(this.props.filters, prevProps.filters)
      // this.props.filters !== prevProps.filters
      // this.props.filters.sort_by !== prevProps.filters.sort_by ||
      // this.props.filters.primary_release_year !==
      //   prevProps.filters.primary_release_year
    ) {
      this.props.onChangePagination({ page: 1 });
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
