import React, { Component } from "react";
import classNames from "classnames";

export default class Pagination extends Component {
  nextPage = () => {
    this.props.onChangePagination({
      page: this.props.page + 1,
      total_pages: this.props.total_pages,
    });
  };

  prevPage = (page) => (event) => {
    this.props.onChangePagination({
      page: this.props.page - 1,
      total_pages: this.props.total_pages,
    });
  };

  render() {
    const { page, total_pages } = this.props;
    // console.log("total_pages", total_pages);
    return (
      <div>
        <nav className="d-flex align-items-center">
          <ul className="pagination mb-0 mr-3">
            <li
              className={classNames("page-item", {
                disabled: page === 1,
              })}
            >
              <span className="page-link" onClick={this.prevPage(page)}>
                Назад
              </span>
            </li>
            <li
              className={classNames("page-item", {
                disabled: page >= total_pages,
              })}
            >
              <span className="page-link" onClick={this.nextPage}>
                Вперед
              </span>
            </li>
          </ul>
          {/*<div className="d-block">*/}
          {/*{page} of {total_pages}*/}
          {/*</div>*/}
        </nav>
        <div className="d-block">
          Страница: {page} из {total_pages}
        </div>
      </div>
    );
  }
}
