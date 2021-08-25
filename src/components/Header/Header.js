import React, { Component } from "react";
import { Login } from "./Login/Login";
import User from "./User";

export class Header extends Component {
  render() {
    const { user } = this.props;
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
          {user ? <User /> : <Login />}
        </div>
      </nav>
    );
  }
}
