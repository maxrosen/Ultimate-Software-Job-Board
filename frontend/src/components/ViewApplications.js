import React, {Component} from 'react';
import ApplyModal from './ApplyModal';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as template from './api/formTemplate'
import * as formfunction from './api/formFunction';
import JobDesModal from './JobDesModal';
import PositionForm from './positionForm'
import FormGen from './FormGen';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';
import Modal from 'react-modal';

class ViewApplications extends Component {
    constructor(){
        super();
        this.state={
            modalIsOpen: false,
            position: '',
            phonenumber: '',
            name: '',
            clicked: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.closeModal();
        this.handleSubmit();
    }

    handleSubmit(event) {
      alert('Applicant hired!');
    }

    render(){
        return(
          <Container className = 'Jobs'>
          <h1>{this.props.position}</h1>
          <p>{this.props.name}</p>
          <p>{this.props.phonenumber}</p>
          <Row>
  	        <Col md = {{size:2,offset:10} }>
  	         <button size='lg' className = "greenButton" onClick={this.openModal}>Apply</button>
  	        </Col>
          </Row>
          </Container>
        );
    };

}

const customStyles = {
  content : {
    top                   : '20%',
    left                  : '50%',
    right                 : '80%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default ViewApplications;
