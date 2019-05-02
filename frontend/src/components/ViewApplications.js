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
import jwt_decode from 'jwt-decode';
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

    emailApp(e){
        let user = jwt_decode(localStorage.jwttoken)
        e.preventDefault();
        console.log(`Emailing applicant`);

        let emailSubject = 'Dear '+this.props.name

        let emailBody =
          'Dear '+this.props.name+',%0D%0A%0D%0A'+
          'After reviewing you application for '+this.props.position+' we would like to extend an offer to you for the position.'+
          '%0D%0A%0D%0APlease reply to this email so we can move forward with your onboarding process.'+
          '%0D%0A%0D%0ASincerely, %0D%0A'+user.first_name+' '+user.last_name


        window.location.href = 'mailto:'+this.props.email+'?subject='+emailSubject+'&body='+emailBody;
    }

    render(){
        let user = jwt_decode(localStorage.jwttoken)
        return(
          <Container className = 'Jobs'>
          <h1>Applicant Name: {this.props.name}</h1>
          <p>Position: {this.props.position}</p>
          <p>Phone number: {this.props.phonenumber}</p>
          <p>Email address: {this.props.email}</p>
          <Row>
  	        <Col md = {{size:2,offset:10} }>
  	         <button size='lg' className = "greenButton" onClick={(e) => this.deleteApp(e)}>Delete</button>
             <button size='lg' className = "greenButton" onClick={(e) => this.emailApp(e)}>Email Applicant</button>
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
