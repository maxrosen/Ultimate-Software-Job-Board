import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';


class PositionForm extends React.Component {
    constructor(){
        super();
        this.state={
            title: '',
            description: '',
            companyId: '',
            companyName: '',
            managerId: ''

        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        let user = jwt_decode(localStorage.jwttoken);
        console.log(`Form submitted:`);
        const newPosition = {
            title: this.state.title,
            description: this.state.description,
            companyId: user.companyId,
            companyName: user.companyName,
            managerId: user.employeeId
        }

        Axios.post('/api/positions/create',newPosition).then(res=>console.log(res.data));


        this.setState({
            title: '',
            description: '',
            companyId: '',
            companyName: '',
            managerId: ''
        })
    }
    render(){
        return(
        <Form onSubmit={this.onSubmit}>
            <FormGroup>
                <Label for="position">New Position</Label>
                <Input type="text" name="title" id="title" placeholder="Type a job title" value={this.state.title||""} onChange={this.onChange.bind(this)}/>
                <Input type="text" name="description" id="description" placeholder="Type a description" value={this.state.description||""} onChange={this.onChange.bind(this)}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
        );
    };
}

export default PositionForm;
