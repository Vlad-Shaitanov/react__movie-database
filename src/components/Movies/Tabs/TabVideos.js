import React, { Component } from "react";
import CallApi from "../../../api/api";
import { v4 as uuidv4 } from "uuid";

export class TabVideos extends Component {
  constructor() {
    super();

    this.state = {
      videos: [],
    };
  }

  updateVideos = (videos) => {
    this.setState({
      videos,
    });
  };
  componentDidMount() {
    const getVideo = async () => {
      try {
        const videos = await CallApi.get(`/movie/${this.props.id}/videos`, {
          params: {
            language: "ru-RU",
          },
        });

        this.updateVideos(videos);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getVideo();
  }

  render() {
    const { results } = this.state.videos;
    // console.log(results);
    let trailers = [];

    try {
      trailers = results.map((item) => {
        const sourse = `http://www.youtube.com/embed/${item.key}?autoplay=0&origin=http://example.com`;
        return (
          <div key={uuidv4()}>
            <div className="h4 text-center py-3">{item.name}</div>
            <div className="d-flex justify-content-center">
              <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                title="trailer"
                src={sourse}
                frameBorder="0"
              />
            </div>
          </div>
        );
      });
    } catch (error) {
      console.log("error", error.name + error.message);
    }
    return (
      <div>
        {trailers.length !== 0 ? trailers : <p>Нет доступных видео:(</p>}
      </div>
    );
  }
}
