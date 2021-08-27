import React from "react";
import { AppContext } from "../App";

export default (Component) =>
  class AppContextHOC extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {(context) => <Component {...this.props} {...context} />}
          {/*Возвращаем полученный компонент с пропсами и контекстом*/}
        </AppContext.Consumer>
      );
    }
  };
