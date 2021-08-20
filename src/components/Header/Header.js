import React, { Component } from "react";
import { Login } from "./Login/Login";

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link link-light" aria-current="page" href="#">
                Home
              </a>
            </li>
          </ul>
          <Login updateUser={this.props.updateUser} />
        </div>
      </nav>
    );
  }
}
