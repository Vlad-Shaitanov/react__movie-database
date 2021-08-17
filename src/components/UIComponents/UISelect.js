import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export class UISelect extends Component {
  static defaultProps = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  // PureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("this.props", this.props);
  //   console.log("nextProps", nextProps);
  //   if (!_.isEqual(nextProps, this.props)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { id, name, value, onChange, labelText, children } = this.props;
    console.log("UISelect render");
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <select
          id={id}
          className="form-control"
          value={value}
          name={name}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
}
