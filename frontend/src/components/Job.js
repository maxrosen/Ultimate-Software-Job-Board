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

class Job extends Component {
    constructor(){
        super();
        this.state={
            modalIsOpen: false,
            first_name: '',
            last_name: '',
            phonenumber: '',
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

        console.log(`Form submitted:`);
        const newApplication = {
            name: this.state.name,
            phonenumber: this.state.phonenumber,
            email: this.state.email,
            position: this.props.title,
            positionid: this.props.id
        }
        Axios.post('http://localhost:4000/api/applications/create',newApplication).then(res=>console.log(res.data));

        this.setState({
            first_name: '',
            last_name: '',
            phonenumber: '',
            email: '',
        })

        this.closeModal();
        this.handleSubmit();
    }

    handleSubmit(event) {
      alert('Application submitted!');
    }

    render(){
        return(
        <Container className = 'Jobs'  >
        <JobDesModal clicked={this.state.clicked} />
        <h1>{this.props.title}</h1>
        <p>{this.props.company}</p>
        <p>{this.props.description}</p>
        <Row>
	        <Col md = {{size:2,offset:10} }>
	         <button size='lg' className = "greenButton" onClick={this.openModal}>Apply</button>
	        </Col>
        </Row>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
              <Label for="position">Apply</Label>
              <Input type="text" name="name" id="name" placeholder="Type your name" value={this.state.name||""} onChange={this.onChange.bind(this)}/>
              <Input type="text" name="email" id="email" placeholder="Type your email" value={this.state.email||""} onChange={this.onChange.bind(this)}/>
              <Input type="number" name="phonenumber" id="phonenumber" placeholder="Type your phone number" value={this.state.phonenumber||""} onChange={this.onChange.bind(this)}/>
            </FormGroup>
            <Button color="primary">Submit</Button>
            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
	        </Form>
        </Modal>
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

export default Job;
