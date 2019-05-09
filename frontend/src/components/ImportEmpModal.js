/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ImportPosModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button size='lg' className="greenButton" color="dark" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.buttonLabel}</ModalHeader>
          <ModalBody align = "center">
            <p align="center"> JSON File in Format: </p>
            <p align = "center">
            "firstName",
            "lastName",
            "email",
            "employeeId",
            "companyName",
            "companyId",
            "managerId",
            "positionTitle",
            "startDate"
            </p>
            {this.props.children}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ImportPosModal;