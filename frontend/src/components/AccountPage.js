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
            <Container>
                <div className="AccountPageConfig">
                    <div className="AccountBar" align="center">

                        <h2 align="center">Manager Options</h2>
                        
                        <div className="sideBar">
                            <div className="space">
                                <h3 align="left">Applications</h3>
                            </div>
                                <Row className="space">
                                    <Link to="/viewapps">
                                        <Button className="greenButton" size='lg'>Open Applications</Button>
                                    </Link>
                                </Row>
                                <Row className="space">
                                    <CustomQuestionModal key='0' buttonLabel='Custom Questions' children={<FormGen template={template.question} formfunction={formfunction.createQuestion} />} />
                                </Row>

                            <div className="space">
                                <h3 align="left">Jobs</h3>
                            </div>
                                <Row className="space">
                                    <ApplyModal key='1' buttonLabel='Add Position' children={<FormGen template={template.work} formfunction={formfunction.createPosition} />} />
                                </Row>
                                <Row className="space">
                                    <Link to="/managejobs">
                                        <Button className="greenButton" size='lg'>Edit Postings</Button>
                                    </Link>
                                </Row>

                            <div className="space">
                                <h3 align="left">Import Data</h3>
                            </div>
                                <Row className="space">
                                    <ApplyModal key='1' buttonLabel='Import Positions' children={<FormGen template={template.file} formfunction={formfunction.importPositions} />} />
                                </Row>
                                <Row className="space">
                                    <ApplyModal key='1' buttonLabel='Import Employees' children={<FormGen template={template.file} formfunction={formfunction.importEmployees} />} />
                                </Row>   
                        </div>
                    </div>

                    <div className="UserProfile">
                        <div className="profileCenter">
                            <div className="profileInfo">
                                <Media className="profileImg" src={require('./resources/profile.png')} alt="image" />
                                <div className="profileTextdiv" >
                                    <p className="profileName">{user.first_name} {user.last_name}</p>
                                    <p className="profileText">{user.title}</p>
                                    <p className="profileText">{user.email}</p>
                                    <p className="profileText">Employee ID: {user.employeeId}</p>
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

                    <div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal"
                            style={customStyles}>
                        </Modal>
                    </div>
                </div>
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
