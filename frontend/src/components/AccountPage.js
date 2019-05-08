import React, { Component } from 'react';
import { Container, Button, Col, Row, Form, FormGroup, Label, Input, Media } from 'reactstrap';
import ApplyModal from './ApplyModal';
import ImportPosModal from './ImportPosModal';
import ImportEmpModal from './ImportEmpModal';
import CustomQuestionModal from './CustomQuestionModal';
import * as template from './api/formTemplate';
import * as formfunction from './api/formFunction';
import FormGen from './FormGen';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import axios from 'axios';

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

    handlePositions = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
        // Use reader.result
            console.log(reader.result);
            var contents = JSON.parse(reader.result);
            var i = 0;
            for(i; i< contents.length; i++){
                axios.post('  api/positions/create',contents[i]).then(res=>console.log(res.data));
            }
            alert("Positions have been added!");
        }
        reader.readAsText(files[0]);
    }

    handleEmployees = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
        // Use reader.result
            console.log(reader.result);
            var contents = JSON.parse(reader.result);
            var i = 0;
            for(i; i< contents.length; i++){
                console.log(contents[i]);
                var newUser = contents[i];
                newUser["password"] = "12345";
                axios.post('  /api/users/register', newUser).then(res=>console.log(res.data));
                axios.post('  /api/employees/create',contents[i]).then(res=>console.log(res.data));
            }
            alert("Employees have been added!");
        }
        reader.readAsText(files[0]);
    }

    render() {
        let user = jwt_decode(localStorage.jwttoken);
        if(user.employeeId == 1){
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
                                    <CustomQuestionModal key='0' buttonLabel='Edit Custom Questions' children={<FormGen template={template.question} formfunction={formfunction.createQuestion} />} />
                                </Row>

                            <div className="space">
                                <h3 align="left">Jobs</h3>
                            </div>
                                <Row className="space">
                                    <ApplyModal key='1' buttonLabel='Add Position' children={<FormGen template={template.work} formfunction={formfunction.createPosition} />} />
                                </Row>
                                <Row className="space">
                                    <Link to="/managejobs">
                                        <Button className="greenButton" size='lg'>Edit Positions</Button>
                                    </Link>
                                </Row>

                            <div className="space">
                                <h3 align="left">Import Data</h3>
                            </div>
                                <Row className="space">
                                    <ImportPosModal key='1' buttonLabel='Import Positions' 
                                    children={<ReactFileReader handleFiles={this.handlePositions} fileTypes={'.json'}> <button className="greenButton">Upload</button> </ReactFileReader>} />
                                </Row>
                                <Row className="space">
                                    <ImportEmpModal key='1' buttonLabel='Import Employees' 
                                    children={<ReactFileReader handleFiles={this.handleEmployees} fileTypes={'.json'}> <button className="greenButton">Upload</button> </ReactFileReader>} />
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
                                Company Bio and Name
                            </div>
                        </div>
                    </div>

                    <div className="recentJobs">
                        <p className="recentJobsText">Recently Posted</p>
                        <Container>
                            Recently Posted Jobs
                        </Container>
                    </div>

                </div>
            </Container>
        );}
        else{
            return(
                <Container>
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
                                Company Bio and Name
                            </div>
                        </div>
                    </div>
                </Container>
        );}
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
	overlay: { zIndex: 9999 }
};

export default AccountPage;
