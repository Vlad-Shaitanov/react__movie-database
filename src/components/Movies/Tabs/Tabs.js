import React, { Component } from "react";
import { Switch, NavLink, Route } from "react-router-dom";
import { TabContent, Nav, NavItem } from "reactstrap";

import { TabDetails } from "./TabDetail";
import { TabVideos } from "./TabVideos";
import { TabCredits } from "./TabCredits";

export class Tabs extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="row">
        <Nav tabs>
          <NavItem className="nav-item">
            <NavLink
              to={`/movie/${movie.id}/details`}
              activeStyle={{
                backgroundColor: "#0D6EFD",
                color: "#fff",
              }}
              className="nav-link"
            >
              Подробнее
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink
              to={`/movie/${movie.id}/videos`}
              activeStyle={{
                backgroundColor: "#0D6EFD",
                color: "#fff",
              }}
              className="nav-link"
            >
              Видео
            </NavLink>
          </NavItem>
          <NavItem className="nav-item">
            <NavLink
              to={`/movie/${movie.id}/credits`}
              activeStyle={{
                backgroundColor: "#0D6EFD",
                color: "#fff",
              }}
              className="nav-link"
            >
              Актеры
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <Switch>
            <Route path={`/movie/${movie.id}/details`}>
              <TabDetails movie={movie} />
            </Route>
            <Route path={`/movie/${movie.id}/videos`}>
              <TabVideos id={movie.id} />
            </Route>
            <Route path={`/movie/${movie.id}/credits`}>
              <TabCredits />
            </Route>
          </Switch>
        </TabContent>
      </div>
    );
  }
}
