import React, { Component } from 'react';
import {Container,  Button, Col, Row, Form, FormGroup, Label, Input, Media, } from 'reactstrap'
import ApplyModal from './ApplyModal';
import CustomQuestionModal from './CustomQuestionModal';
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
            modalIsOpen: false,
            clicked: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        
    }


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
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
                            <Link to="/managejobs">
                                <Button className="greenButton" size='lg'>Edit Postings</Button>
                            </Link>
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
                            <CustomQuestionModal key='0' buttonLabel='Manage Questions' buttonLabel='ManageQuestions' children={<FormGen template={template.question} formfunction={formfunction.createQuestion} />} />
                        </div>
                    </div>
                    <div className="UserProfile">
                        <div className="profileCenter">
                            <div className="profileInfo">
                                <Media className="profileImg" src={require('./resources/profile.png')} alt="image" />
                                <div className="profileTextdiv" >
                                    <p className="profileName">Joe Smith</p>
                                    <p className="profileText">Software Engineer</p>
                                    <p className="profileText">Joesmith@slackers.com</p>
                                    <p className="profileText">Employee ID: 123456789</p>
                                </div>
                            </div>
                            <div className="companyBox">
                                text
                        </div>
                        </div>
                    </div>
                    <div className="recentJobs">
                        <p className="recentJobsText">Recently Posted</p>
                        <Container>
                            stuff
                        </Container>
                    </div>

                </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                        style={customStyles}
                    >
                   

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
    },
    overlay: {zIndex:9999}
   
};

export default AccountPage;
