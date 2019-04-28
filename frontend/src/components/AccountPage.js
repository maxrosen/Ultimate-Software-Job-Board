import React, { Component } from 'react';
import { Container, Button, Col, Row, Form, FormGroup, Label, Input, } from 'reactstrap'
import ApplyModal from './ApplyModal';
import * as template from './api/formTemplate';
import * as formfunction from './api/formFunction';
import FormGen from './FormGen';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
class AccountPage extends Component {
    constructor() {
        super();
        this.state = {
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newApplication = {
        }
       
        this.setState({
           
        })
        this.closeModal();
        this.handleSubmit();
    }

    handleSubmit(event) {
        alert('Application submitted!');
    }




    render(){
        return (
            <React.Fragment>
                <div className="AccountBar" align ="center">
                    <Row>
                        <div className="sideBar">
                            <Col>
                                <Row className="space">
                                <ApplyModal key='1' buttonLabel='Add Job' children ={<FormGen template = {template.work} formfunction= {formfunction.createPosition}/>}/>
                            </Row>
                                <Row className="space">
                                <Button className="greenButton" size='lg' onClick={() => { alert('under development') }}>Edit Postings</Button>
                            </Row>
                                <Row className="space">   
                                    <Link to="/viewapps">
                                        <Button className="greenButton" size='lg'>Manage Applications</Button>
                                    </Link>
                            </Row>
                                <Row className="space">
                                <Button className="greenButton" size='lg'>Import Employees</Button>
                            </Row>
                                <Row className="space">
                                <Button className="greenButton" size='lg'>Import Jobs</Button>
                                </Row>
                                <Row className="space">
                                    <Button className="greenButton" size='lg' onClick={this.openModal}>Manage Questions</Button>
                                </Row>
                            </Col>
                            </div>
                    </Row>
                </div>


                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="position">Questions</Label>
                           
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                    </Form>
                </Modal>


            </React.Fragment>
        );
    }

}
const customStyles = {
    content: {
        top: '20%',
        left: '50%',
        right: '80%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default AccountPage;
