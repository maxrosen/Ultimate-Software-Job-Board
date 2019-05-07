import React, {Component} from 'react';
import JobDesModal from './JobDesModal';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios';
import Modal from 'react-modal';

class Job extends Component {
    constructor(){
        super();
        this.state={
            modalIsOpen: false,
            first_name: '',
            last_name:'',
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

        let email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        let phone_regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

        let valid_email = email_regex.test(this.state.email);
        let valid_phone = phone_regex.test(this.state.phonenumber);

        if(valid_email && valid_phone){
            const newApplication = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phonenumber: this.state.phonenumber,
                email: this.state.email,
                position: this.props.title,
                positionid: this.props.id
            }
            Axios.post('  /api/applications/create',newApplication).then(res=>console.log(res.data));

            this.setState({
                first_name: '',
                last_name:'',
                phonenumber: '',
                email: '',
            });

            this.closeModal();
            this.handleSubmit();

        }
        else{
            if(!valid_email){
                alert('Invalid email address');
            }
            else{
                alert('Invalid phone number');
            }
        }
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
              <Input type="text" name="first_name" id="first_name" placeholder="Type your first name" value={this.state.first_name||""} onChange={this.onChange.bind(this)}/>
              <Input type="text" name="last_name" id="last_name" placeholder="Type your last name" value={this.state.last_name||""} onChange={this.onChange.bind(this)}/>
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
    top                   : '35%',
    left                  : '50%',
    right                 : '70%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default Job;
