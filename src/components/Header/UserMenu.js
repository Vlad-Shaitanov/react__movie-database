import React, { Component } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { AppContext } from "../App";
import CallApi from "../../api/api";

class UserMenu extends Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false,
    };
  }

  toggleDropDown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !this.state.dropdownOpen,
    }));
  };

  handleLogOut = () => {
    // fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
    //   method: "DELETE",
    //   mode: "cors",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     session_id: this.props.session_id,
    //   }),
    // }).then(() => this.props.onLogOut());
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.props.session_id,
      },
    });
    this.props.onLogOut();
  };

  render() {
    const { user } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
        <DropdownToggle
          tag="div"
          onClick={this.toggleDropDown}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <img
            width="40"
            className="rounded-circle"
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
            alt=""
            onClick={this.toggleDropDown}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogOut}>Выход</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const UserMenuContainer = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        // console.log(context);
        return <UserMenu {...context} {...props} />;
      }}
    </AppContext.Consumer>
  );
};

/*Подпишем обертку, чтобы она не отображалась в девтулз как анонимная,
а имела имя. Такой подход упрощает обработку ошибок*/
UserMenuContainer.displayName = "UserMenuContainer";

export default UserMenuContainer;
