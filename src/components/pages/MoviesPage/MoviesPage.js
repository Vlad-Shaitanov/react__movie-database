import React, { Component } from "react";
import { Filters } from "../../Filters/Filters";
import MoviesList from "../../Movies/MovieList.js";

export default class MoviesPage extends Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc", // sort_by: "vote_average.desc",
        primary_release_year: toString(new Date().getFullYear()),
        with_genres: [],
      },
      page: 1,
      total_pages: "",
    };
  }

  onChangeFilters = (event) => {
    this.setState((prevState) => ({
      filters: {
        ...this.state.filters,
        [event.target.name]: event.target.value,
      },
    }));
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    // console.log(page);
    this.setState({
      page: page,
      total_pages: total_pages,
    });
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePagination={this.onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}
