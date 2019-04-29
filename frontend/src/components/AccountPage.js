import React, { Component } from 'react';
import {Button, Col, Row, Form, FormGroup, Label, Input, Media, } from 'reactstrap'
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
        // this.state.questions[this.state.questions.indexOf(event.target.key)] = event.target.value;
        const temparray = this.state.questions;
        this.setState({ questions: temparray });
    }

    saveQuestions(e) {
        e.preventDefault();
        this.closeModal();
        this.handleSubmit();
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

    handleSubmit(event) {

    }

    render() {
        let { questions } = this.state
        return (
            <React.Fragment>
                <div className="AccountBar" align="center">
                    <Row>
                        <div className="sideBar">
                            <Col>
                                <Row className="space">
                                    <ApplyModal key='1' buttonLabel='Add Job' children={<FormGen template={template.work} formfunction={formfunction.createPosition} />} />
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
                                <Button className="greenButton" size='lg' onClick={() => {alert('import popup')}}>Import Employees</Button>
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
                    <Form >
                        <FormGroup>
                            <Label>Questions</Label>
                            {this.state.questions.map((question, index) =>
                                <div key={question} id={index}>
                                    <Row>
                                        <Col>
                                            <Input type="text" id={index} key={question} placeholder="Type your question" defaultValue={question} onChange={this.onChange.bind(this)} />
                                     </Col>
                                       <Col>
                                            <Media id={index} key={question} className="cancelImg" src={require('./resources/redX.png')} alt="image" onClick={this.deleteQuestion.bind(this)} />
                                     </Col>
                                            </Row>
                                </div>
                            )}
                        </FormGroup>
                        <Button color="primary" onClick={this.saveQuestions}>Save</Button>
                        <Button color="primary" onClick={this.addQuestion}>Add</Button>

                          
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
