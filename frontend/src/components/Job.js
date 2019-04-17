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
    /*
    constructor(props){
        super(props);
        this.state={
            clicked: false
        }

        this.toggle=this.toggle.bind(this);
    }

    toggle() {
        console.log("clicked")
        this.setState(prevState => ({
            clicked: !prevState.clicked
        }));
      }

    render(){

    return(
    <Container className = 'Jobs'  >
    <JobDesModal clicked={this.state.clicked} />
    <h1 onClick={this.toggle} >{this.props.title}</h1>
    <p>{this.props.description}</p>
    <Row>
        <Col md = {{size:3,offset:9} }>
		<ApplyModal buttonLabel='Apply' children ={<FormGen template = {template.apply} formfunction= {formfunction.createPosition}/>}/>
        </Col>

    </Row>

    </Container>)
    }
    */
    constructor(){
        super();
        this.state={
            modalIsOpen: false,
            name: '',
            phonenumber: '',
            address: '',
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
            address: this.state.address,
            position: this.props.title,
            positionid: this.props.id
        }
        Axios.post('http://localhost:4000/api/applications/create',newApplication).then(res=>console.log(res.data));

        this.setState({
            name: '',
            phonenumber: '',
            address: '',
        })
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
        <ApplyModal key='1' buttonLabel='Apply' children ={<FormGen template = {template.apply} formfunction= {formfunction.createPosition}/>}/>
        </Col>
        </Row>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >

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
