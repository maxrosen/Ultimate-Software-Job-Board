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
import ApplicationList from './ApplicationList';

class ViewApplications extends Component {
    constructor(){
        super();
        this.state={
            modalIsOpen: false,
            position: '',
            phonenumber: '',
            name: '',
            email: '',
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

    deleteApp(e) {
        e.preventDefault();
        console.log(`Application removed`);

        Axios.delete('http://localhost:4000/api/applications/delete/' + this.props.id)
          .then(res => {
          console.log(res.data);
          window.location.reload();
        });


    }

    render(){
        return(
          <Container className = 'Jobs'>
          <h1>Applicant Name: {this.props.name}</h1>
          <p>Position: {this.props.position}</p>
          <p>Phone number: {this.props.phonenumber}</p>
          <p>Email address: {this.props.email}</p>
          <Row>
  	        <Col md = {{size:2,offset:10} }>
  	         <button size='lg' className = "greenButton" onClick={(e) => this.deleteApp(e)}>Delete</button>
             <button size='lg' className = "greenButton" onClick={this.openModal}>Email Applicant</button>
             <button size='lg' className = "greenButton" onClick={this.openModal}>Hire Applicant</button>
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
