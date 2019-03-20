import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';


class AppForm extends React.Component {
    constructor(){
        super();
        this.state={
            name: ""
            
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    
    onChange(event){
        this.setState({name: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.name}`);
        const newPerson = {
            name: this.state.name
        }
        Axios.post('http://localhost:4000/api/users/create',newPerson).then(res=>console.log(res.data));
        
        this.setState({
            name: ''
        })
    }
    render(){
        return(
        <Form onSubmit={this.onSubmit}>
            <FormGroup>
                <Label for="username">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Type a name" value={this.state.name||""} onChange={this.onChange.bind(this)}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>

        );
    };
}

export default AppForm;