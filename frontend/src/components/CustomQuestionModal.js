/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Media, Alert } from 'reactstrap';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

class CustomQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [""],
        modalIsOpen: false,
        clicked: false

    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onChange(event) {
      // this.setState()
        this.state.questions[event.target.id] = event.target.value;

        const temparray = this.state.questions;
        this.setState({ questions: temparray });
 }

  saveQuestions(e) {

        // const user: jwt_decode(localStorage.jwttoken) 
        // console.log("current user info");
        // console.log(user);
        e.preventDefault();
        const temparray = this.state.questions;
        const filtered = temparray.filter(function(a) {
          return a !== null && a !== "";
        });
        if(filtered.length > 0) {
          const newQuestions = {
            question: filtered,
            companyId: 1,
            managerId: 1
          }
          Axios.post('http://localhost:4000/api/customquestions/create',newQuestions).then(res=>console.log(res.data));

          this.setState({
              questions: [""],
          })  
        } else {
          
        }
        
        this.closeModal();
  }

  addQuestion() {
        this.state.questions.push("");
        const temparray = this.state.questions;
        this.setState({ questions: temparray });
        console.log("questions:");
        console.log(this.state.questions);
  }

  deleteQuestion(event) {
        this.state.questions.splice(event.target.id, 1);
        console.log(this.state.questions);
        let temparray = this.state.questions;
        this.setState({ questions: temparray });
  }

  render() {
    return (
      <div>
        <Button size='lg' className="greenButton" color="dark" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.buttonLabel}</ModalHeader>
          <ModalBody>
            {this.state.questions.map(
              (question, index) =>
                <div className="questionAlign" key={index} id={index}>
                    <Input type="text" id={index} key={index} placeholder="Type your question" Value={question} onChange={this.onChange.bind(this)} />
                    <Media id={index} key={index} className="cancelImg" src={require('./resources/redX.png')} alt="image" onClick={this.deleteQuestion.bind(this)} />
                </div>
              )
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addQuestion}>Add Question</Button>
            <Button color="primary" type='submit' form='form' onClick={this.saveQuestions}>Save</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default CustomQuestionModal  ;
