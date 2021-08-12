import React, { Component } from "react";

export class Filters extends Component {
  render() {
    const {
      filters: { sort_by },
      page,
      onChangeFilters,
      onChangePage,
    } = this.props;

    return (
      <form className="mb-3">
        <div className="form-group">
          <label htmlFor="sort_by">Сортировать по:</label>
          <select
            id="sort_by"
            className="form-control"
            value={sort_by}
            name="sort_by"
            onChange={onChangeFilters}
          >
            <option value="popularity.desc">Популярные по убыванию</option>
            <option value="popularity.asc">Популярные по возрастанию</option>
            <option value="vote_average.desc">Рейтинг по убыванию</option>
            <option value="vote_average.asc">Рейтинг по возрастанию</option>
          </select>
        </div>
        <div className="btn-group mt-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={page === 1}
            // onClick={() => {
            //   onChangePage(page - 1);
            // }}
            onClick={onChangePage.bind(null, page - 1)}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            // onClick={() => {
            //   onChangePage(page + 1);
            // }}
            onClick={onChangePage.bind(null, page + 1)}
          >
            Вперед
          </button>
        </div>
      </form>
    );
  }
}
