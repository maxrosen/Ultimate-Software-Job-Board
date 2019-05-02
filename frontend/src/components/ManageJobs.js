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
import ManageJobsList from './ManageJobsList';

class ManageJobs extends Component {
    constructor(){
        super();
        this.state={
            modalIsOpen: false,
            title: '',
            description: '',
            companyId: '',
            companyName: '',
            managerId: '',
            postedDate: '',
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

    deletePosting(e) {
        e.preventDefault();
        console.log(`Posting removed`);

        Axios.delete('http://localhost:4000/api/positions/delete/' + this.props.id)
          .then(res => {
          console.log(res.data);
          window.location.reload();
        });

    }

    editPosting(e) {
        e.preventDefault();
        let nm = this.props.title;
        if(this.state.title!='')
          nm = this.state.title;
        let dscrpt = this.props.description;
        if(this.state.description!='')
          dscrpt = this.state.description;
        Axios.post('http://localhost:4000/api/positions/update/' + this.props.id, {params:{title:nm, description:dscrpt}})
          .then(res => {
          console.log(res.data);
          window.location.reload();
        });
        this.closeModal();

    }

    render(){
        return(
          <Container className = 'Jobs'>
          <JobDesModal clicked={this.state.clicked} />
          <h1>Position Title: {this.props.title}</h1>
          <p>Description: {this.props.description}</p>
          <p>Post Date: {this.props.postedDate}</p>
          <p>Company Name: {this.props.companyName}</p>
          <Row>
            <Col md = {{offset:10} }>
             <button size='lg' className = "greenButton" onClick={this.openModal}>Edit</button>
            </Col>
  	        <Col >
  	         <button size='lg' className = "greenButton" onClick={(e) => this.deletePosting(e)}>Delete</button>
  	        </Col>
          </Row>
          <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                style={customStyles}
              >
              <Form onSubmit={(e) => this.editPosting(e)}>
                <FormGroup>
                    <Label for="position">Edit</Label>
                    <Input type="text" name="title" id="title" placeholder={this.props.title} value={this.state.title||this.props.title} onChange={this.onChange.bind(this)}/>
                    <Input type="text" name="description" id="description" placeholder={this.props.description} value={this.state.description||this.props.description} onChange={this.onChange.bind(this)}/>
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
    top                   : '30%',
    left                  : '50%',
    right                 : '70%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default ManageJobs;
