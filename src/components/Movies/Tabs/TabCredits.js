import React, { Component } from "react";
import CallApi from "../../../api/api";
import { v4 as uuidv4 } from "uuid";

export class TabCredits extends Component {
  constructor() {
    super();

    this.state = {
      credits: [],
    };
  }

  updateCredits = (credits) => {
    this.setState({
      credits,
    });
  };

  componentDidMount() {
    const getCredits = async () => {
      try {
        const credits = await CallApi.get(`/movie/${this.props.id}/credits`, {
          params: {
            language: "ru-RU",
          },
        });

        this.updateCredits(credits);
      } catch (error) {
        console.log("Error", error.name, error.message);
      }
    };

    getCredits();
  }

  render() {
    const { cast, crew } = this.state.credits;
    let castList = [];
    // let crewList = [];

    try {
      castList = cast.map((item) => {
        const characterLogo = `https://image.tmdb.org/t/p/w500${item.profile_path}`;

        return (
          <div className="col-sm-3 mb-3" key={uuidv4()}>
            <div className="card h-100">
              <img
                src={
                  item.profile_path
                    ? characterLogo
                    : "https://www.santehnika29.su/image/cache/placeholder-1000x1000.png"
                }
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <p className="text-center fw-bold">Роль:</p>
                <p className="card-text text-center">{item.character}</p>
                <p className="text-center fw-bold">Актер:</p>
                <p className="card-text text-center">{item.name}</p>
              </div>
            </div>
          </div>
        );
      });
    } catch (error) {
      console.log("Error", error.name, error.message);
    }

    return <div className="row mt-3">{castList}</div>;
  }
}
