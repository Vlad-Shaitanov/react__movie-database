import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export class TabDetails extends Component {
  render() {
    const {
      movie: {
        title,
        original_title,
        status,
        release_date,
        runtime,
        original_language,
        production_countries,
        genres,
        budget,
        revenue,
      },
    } = this.props;

    let genresList = [];
    let countries = [];

    try {
      genresList = genres.map((item) => {
        // return item.name;
        return (
          <li>
            <span className="badge bg-primary px-2" key={uuidv4()}>
              {item.name}
            </span>
          </li>
        );
      });
      // console.log(genresList);
      countries = production_countries.map((item) => {
        return (
          <li>
            <span className="badge bg-primary px-2" key={uuidv4()}>
              {item.name}
            </span>
          </li>
        );
      });
    } catch (error) {
      console.log("Error", `${error.name} ${error.message}`);
    }

    return (
      <div>
        <p className="h4 text-center pb-2">{title}</p>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Статус:</div>
          <div>{status}</div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Дата премьеры:</div>
          <div>{release_date}</div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Продолжительность:</div>
          <div>{runtime} минут(ы)</div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Язык оригинала:</div>
          <div>{original_language}</div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Название оригинала:</div>
          <div>{original_title}</div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Бюджет:</div>
          <div>${budget}</div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Кассовые сборы:</div>
          <div>${revenue}</div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Жанры:</div>
          <div>
            <ul className="list-unstyled">{genresList}</ul>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom p-2">
          <div className="fw-bold">Производство:</div>
          <div>
            <ul className="list-unstyled">{countries}</ul>
          </div>
        </div>
      </div>
    );
  }
}
