import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import './style.css';

// <div className={'row justify-content-center mt-4'}>
//   <h1>Welcome, homepage under construction</h1>
//   <a href="/login">Click here to Login</a>
// </div>

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button className="new-idea-btn" onClick={this.toggle}>
          {'Add a New Idea'}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-max-width">
          <ModalHeader className="new-idea-btn-modal-heading" toggle={this.toggle}>
            <h4 className="add-new-idea-text">Add a new Idea</h4>
          </ModalHeader>
          <ModalBody>
            <h3>Hello World</h3>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col lg="6">
                <Button className="new-idea-btn-save" onClick={this.toggle}>
                  {'Save'}
                </Button>
              </Col>
              <Col lg="6" className="new-idea-btn-cancel">
                <Button onClick={this.toggle}>{'Cancel'}</Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default HomePage;
