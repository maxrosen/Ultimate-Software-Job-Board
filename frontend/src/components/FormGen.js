import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios'; 
import * as formfunction from './api/formFunction';
class FormGen extends React.Component {
    constructor(){
        super();
        const work ={
            title: '',
            description: '',
            companyId: '',
            companyName:'',
            managerId: ''
        }
            this.state=work;

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    
    onChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        const newPosition = this.state;
        console.log(newPosition);
        formfunction.createPosition(newPosition)
        Object.keys(this.state).map( i => this.setState({ [i]:''}));
    }
    render(){
        return(
        <Form onSubmit={this.onSubmit}>
            <FormGroup>
                <Label for="position">New Position</Label>
                {Object.keys(this.state).map((field)=> <Input type="text" name={field} id={field} placeholder={"Type a " + field} value={this.state[field]||""} onChange={this.onChange.bind(this)}/>)}
            </FormGroup>
            <Button>Submit</Button>
        </Form>
        );
    };
}

export default FormGen;