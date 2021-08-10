import React, { Component } from "react";
import { MoviesList } from "./Movies/MovieList";
import { Filters } from "./Filters/Filters";

export class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
