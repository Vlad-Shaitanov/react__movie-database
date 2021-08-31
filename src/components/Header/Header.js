import React, { Component } from "react";
import { Login } from "./Login/Login";
// import { UserMenu } from "./UserMenu";
import UserMenuContainer from "./UserMenu";

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
          {user ? <UserMenuContainer /> : <Login />}
        </div>
      </nav>
    );
  }
}
