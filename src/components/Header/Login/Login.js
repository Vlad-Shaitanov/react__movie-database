import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { Modal, ModalBody } from "reactstrap";

export class Login extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    };
  }

  //Переключение модального окна
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
