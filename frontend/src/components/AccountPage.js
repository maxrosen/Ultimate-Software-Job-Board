import React, { Component } from 'react';
import {Container,  Button, Col, Row, Form, FormGroup, Label, Input, Media, } from 'reactstrap'
import ApplyModal from './ApplyModal';
import * as template from './api/formTemplate';
import * as formfunction from './api/formFunction';
import FormGen from './FormGen';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

class AccountPage extends Component {
    constructor() {
        super();
        this.state = {
            questions: ["test1", "test2"],
            modalIsOpen: false,
            clicked: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveQuestions = this.saveQuestions.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onChange(event) {
        this.state.questions[event.target.id] = event.target.value;
        const temparray = this.state.questions;
        this.setState({ questions: temparray });
    }

    saveQuestions(e) {
        e.preventDefault();
        this.closeModal();

    }

    addQuestion() {
        this.state.questions.push("");
        const temparray = this.state.questions;
        this.setState({ questions: temparray });
    }

    deleteQuestion(event) {
        this.state.questions.splice(event.target.id, 1);
        console.log(this.state.questions);
        let temparray = this.state.questions;
        this.setState({ questions: temparray });
    }

    render() {
        let user = jwt_decode(localStorage.jwttoken)
        return (
            <Container className>
                <div className="AccountPageConfig">
                    <div className="AccountBar">
                            <div className="space">
                                <ApplyModal key='1' buttonLabel='Add Job' children={<FormGen template={template.work} formfunction={formfunction.createPosition} />} />
                            </div>
                            <div className="space">
                                <Button className="greenButton" size='lg' onClick={() => { alert('under development') }}>Edit Postings</Button>
                            </div>
                            <div className="space">
                                <Link to="/viewapps">
                                    <Button className="greenButton" size='lg'>Manage Applications</Button>
                                </Link>
                            </div>
                            <div className="space">
                                <Button className="greenButton" size='lg' onClick={() => { alert('import popup') }}>Import Employees</Button>
                            </div>
                            <div className="space">
                                <Button className="greenButton" size='lg'>Import Jobs</Button>
                            </div>
                            <div className="space">
                                <Button className="greenButton" size='lg' onClick={this.openModal}>Manage Questions</Button>
                            </div>  
                    </div>
                    <div className="UserProfile">
                           <div className = "profileInfo">
                                <Media className="profileImg" src={require('./resources/profile.png')} alt="image"/>
                            <div className = "profileTextdiv" >
                
                                    <p className="profileName">Joe Smith</p>
                                    <p className="profileText">Software Engineer</p>
                                    <p className="profileText">Joesmith@slackers.com</p>
                                    <p className="profileText">Employee ID: 123456789</p>
                               
                            </div>
                            </div>
                        </div>
                    </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <Form className="questForm" >
                        <FormGroup>
                            <Label>Questions</Label>
                            {this.state.questions.map((question, index) =>
                                <div className="questionAlign" key={index} id={index}>
                                    <Input type="text" id={index} key={index} placeholder="Type your question" Value={question} onChange={this.onChange.bind(this)} />
                                    <Media id={index} key={index} className="cancelImg" src={require('./resources/redX.png')} alt="image" onClick={this.deleteQuestion.bind(this)} />
                                </div>

                            )}
                        </FormGroup>
                        <Button color="primary" onClick={this.addQuestion}>Add Question</Button>
                        <Button color="secondary" onClick={this.saveQuestions}>Save</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancel</Button>


                    </Form>


                </Modal>


            </Container>
        );
    }

}
const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: '80%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60vh'
    }
};

export default AccountPage;
