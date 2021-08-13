import React, { Component } from "react";
import { SortBy } from "./SortBy";

//todo СДЕЛАТЬ ПАГИНАЦИЮ ОТДЕЛЬНЫМ КОМПОНЕНТОМ

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
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
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
