
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
        this.getQuestions = this.getQuestions.bind(this);
        this.getAnswers = this.getAnswers.bind(this);

    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        // this.
        this.setState({ modalIsOpen: false });
    }

    onChange(event) {
        // this.setState({ [event.target.name]: event.target.value });
        this.state.answer[event.target.id] = event.target.value;

        const temparray = this.state.answer;
        this.setState({ answer: temparray });
        this.getQuestions(this.state.user.companyId);
    }

    getQuestions(companyId) {
        console.log("trying to get existing question");
        Axios.get('/api/customquestions/getCompany/' + companyId, { params: { id: companyId } }).then(data => {
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

    getAnswers(employeeId) {
        Axios.get('/api/customanswers/getCompany/' + employeeId, { params: { id: employeeId } }).then(data => {
            // Axios.get('http://localhost:4000/api/getCompanyManager/', {params:params}).then(data => {

            var answerArray = [];
            for (let i = 0; i < data.data.length; i++) {
                // this.questions
                answerArray.unshift(data.data[i].answer);
            }
            var answer = [].concat.apply([], answerArray);
            this.setState({ answer });

        })
    }

    componentDidMount() {
        this.getQuestions(this.state.user.companyId);
        this.getAnswers(this.state.user.employeeId);
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    onSubmit(e) {
       // console.log("SAVE!");
       e.preventDefault();
        const temparray = this.state.answer;
        // console.log("temparray");
        // console.log(temparray);

        //filter invalid input
        const filtered = temparray.filter(function(a) {
          return a !== null && a !== "";
        });
        if(filtered.length > 0) {
          const newAnswers = {
            answer: this.state.answer,
            companyId: this.state.user.companyId,
            employeeId: this.state.user.employeeId
          }

          let na = this.state.answer;
          let answerID;

          Axios.get(' /api/customanswers/getCompany/'+this.state.user.employeeId,{params:{id:this.state.user.employeeId}})
          .then(data => {
            if(data.data[0] === undefined){
                // console.log("undefined, create new answer");
                // console.log(newAnswers);
                Axios.post('/api/customanswers/create/', newAnswers)
                .then(res => {
                  console.log(res.data[0]);
                });
            }

            else{
                console.log("found!");
              answerID = data.data[0]._id;
              console.log(this.state.answer);
              console.log("TEST: "+answerID);
              console.log(data.data[0]);
              Axios.put('/api/customanswers/update/'+answerID, {params:{answer:na}})
              .then(res => {
                window.location.reload();
                console.log(res.data);
              });
            }
            // console.log("reach here?");
          });

          this.setState({
              answer: [],
          });
          console.log(this.state.answer);
        }

        this.setState({ modal: false });
        this.closeModal();

    }

    render() {
        this.state.user = jwt_decode(localStorage.jwttoken);
        // this.componentDidMount();
        // console.log("user");
        // console.log(this.state.user);
        const {qest,ans,usr,modal} = this.state;
        return (
            <Container >
                <div className = "questionBox">
                {this.state.questions.map(
                        (question, index) =>
                            <div key={index} id={index}>
                                <text id={index} key={index} placeholder="Question">{question}</text>
                                <text id={index} key={question} placeholder="Type your Answer">: {this.state.answer[index]}</text>
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
                                        <Input type="text" id={index} key={question} placeholder="Type your Answer" Value={this.state.answer[index]} onChange={this.onChange} />
                                    </div>
                            )
                            }
                        </FormGroup>
                        <Button color="primary" onClick = {this.onSubmit}>Save</Button>
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
