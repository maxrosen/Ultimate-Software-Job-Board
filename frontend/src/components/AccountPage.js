import React, { Component } from 'react';
import { Button, Col, Row, Form, FormGroup, Label, Input, Media, } from 'reactstrap'
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
            // questions: [""],
            modalIsOpen: false,
            clicked: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onChange(event) {
        //not in use right now
    }

    render() {
        let user = jwt_decode(localStorage.jwttoken)
        return (
            <React.Fragment>
                <div className="AccountPageConfig">
                    <div className="AccountBar" align="center">
                        <div className="sideBar">
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
                                <Button className="greenButton" size='lg' onClick={() => { alert('import popup') }}>Import Employees</Button>
                            </Row>
                            <Row className="space">
                                <Button className="greenButton" size='lg'>Import Jobs</Button>
                            </Row>
                            <Row className="space">
                                <CustomQuestionModal key='0' buttonLabel='Manage Questions' buttonLabel='ManageQuestions' children={<FormGen template={template.question} formfunction={formfunction.createQuestion} />} />
                           </Row>
                        </div>
                    </div>
                    <div className="UserProfile">

                        <Label>{user.companyId}</Label>


                    </div>

                </div>


                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                   
 

                </Modal>


            </React.Fragment>
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
