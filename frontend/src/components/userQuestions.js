
import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import Modal from 'react-modal';

class userQuestions extends Component {
    constructor() {
        super();
        this.state = {
            questions: [''],
            answer: [''],
            user:[],
            modalIsOpen: false,
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

    getQuestions(companyId) {
        console.log("trying to get existing question");
        Axios.get('  /api/customquestions/getCompany/' + companyId, { params: { id: companyId } }).then(data => {
            // Axios.get('http://localhost:4000/api/getCompanyManager/', {params:params}).then(data => {

            var questionarrays = [];
            for (let i = 0; i < data.data.length; i++) {
                questionarrays.unshift(data.data[i].question);
            }
            var questions = [].concat.apply([], questionarrays);
            this.setState({ questions });

        })
        const temparray = this.state.questions;
        //filter invalid input
        const filtered = temparray.filter(function (a) {
            return a !== null && a !== "";
        });
        if (filtered.length < 1) {
            this.setState({ questions: [''] })
        }
        console.log("made the call!");
    }

    componentDidMount() {
        this.getQuestions(this.state.user.companyId, this.state.user.managerId);
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    onSubmit(e) {
       
    }

    render() {
        this.state.user = jwt_decode(localStorage.jwttoken);
        console.log("user");
        console.log(this.state.user);
        return (
            <Container >
                <div className = "questionBox">
                {this.state.questions.map(
                        (question, index) => 
                            <div key={index} id={index}>
                                <text id={index} key={index} placeholder="Question">{question}</text>
                                <text id={index} key={question} placeholder="Type your Answer"></text>
                            </div>
                        
                )
                }
                <div className="space">
                    <Col md={{ size: 5, offset: 7 }}>
                            <button size='lg' className="greenButton" onClick={this.openModal}>Answer Questions</button>
                    </Col>
                    </div>
                   </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                >
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            {this.state.questions.map(
                                (question, index) =>
                                    <div key={index} id={index}>
                                        <text id={index} key={index} placeholder="Question">{question}</text>
                                        <Input type="text" id={index} key={question} placeholder="Type your Answer" onChange={this.onChange.bind(this)} />
                                    </div>
                            )
                            }
                        </FormGroup>
                        <Button color="primary">Save</Button>
                        <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
                    </Form>
                </Modal>
            </Container>
        );
    };

}

const customStyles = {
    content: {
        top: '35%',
        left: '50%',
        right: '70%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default userQuestions;
