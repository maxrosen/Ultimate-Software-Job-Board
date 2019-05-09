/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Media, Alert } from 'reactstrap';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as listFunction from './api/listFunction';

class CustomQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [''],
        modalIsOpen: false,
        clicked: false,
        user: []

    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.getQuestions(this.state.user.companyId, this.state.user.managerId);
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
        e.preventDefault();
        const temparray = this.state.questions;


        //filter invalid input
        const filtered = temparray.filter(function(a) {
          return a !== null && a !== "";
        });
        if(filtered.length > 0) {
          const newQuestions = {
            question: this.state.questions,
            companyId: this.state.user.companyId,
            managerId: this.state.user.employeeId
          }

          let nq = this.state.questions;

          let questionID;

          Axios.get('/api/customquestions/getCompany/'+this.state.user.companyId,{params:{id:this.state.user.companyId}})
          .then(data => {
            if(data.data[0] === undefined){
              Axios.post('/api/customquestions/create/', newQuestions)
              .then(res => {
                console.log(res.data);
              });
            }

            else{
              questionID = data.data[0]._id;
              console.log(this.state.questions);
              console.log("TEST: "+questionID);
              Axios.put('/api/customquestions/update/'+questionID, {params:{question:nq}})
              .then(res => {
                console.log(res.data);
              });
            }
            window.location.reload();

          });

          this.setState({
              questions: filtered,
          });
        }

        this.setState({ modal: false });

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
        // console.log(this.state.questions);
        let temparray = this.state.questions;
        this.setState({ questions: temparray });

  }

  getQuestions(companyId) {
    console.log("trying to get existing question");
    Axios.get('/api/customquestions/getCompany/'+companyId,{params:{id:companyId}}).then(data => {
    // Axios.get('http://localhost:4000/api/getCompanyManager/', {params:params}).then(data => {

      var questionarrays = [];
      for (let i = 0; i < data.data.length; i++){
        questionarrays.unshift(data.data[i].question);
      }
      var questions = [].concat.apply([], questionarrays);
      this.setState({questions});

    })
    const temparray = this.state.questions;
    //filter invalid input
    const filtered = temparray.filter(function(a) {
      return a !== null && a !== "";
    });
    if (filtered.length < 1) {
      this.setState({questions:['']})
    }
    console.log("made the call!");
  }

  render() {
    this.state.user = jwt_decode(localStorage.jwttoken);
    console.log("user");
    console.log(this.state.user);
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
