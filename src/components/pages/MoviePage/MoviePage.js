import React, { Component } from "react";
import CallApi from "../../../api/api";

export default class MoviePage extends Component {
  componentDidMount() {
    const getMovieId = async () => {
      try {
        const id = await CallApi.get(`/movie/${this.props.match.params.id}`);

        console.log(id);
      } catch (error) {
        console.log("error", error);
      }
    };
    getMovieId();
  }

  render() {
    // console.log(this.props);
    return <div>MoviePage</div>;
  }
}
