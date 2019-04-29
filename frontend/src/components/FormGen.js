import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class FormGen extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        console.log(this.props.template)
        Object.keys(this.props.template).map(key=>this.state[key]='');
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
        this.props.formfunction(newPosition) 
        Object.keys(this.state).map( i => this.setState({ [i]:''}));
    }
    render(){
        var count =0;
        return(
        <Form onSubmit={this.onSubmit}  id ='form'>
            <FormGroup>
                {Object.keys(this.props.template).map((field)=> <Input key={count++} type={this.props.template[field]} name={field} id={field} placeholder={"Type a " + field} value={this.state[field]||""} onChange={this.onChange.bind(this)}/>)}
            </FormGroup>
        </Form>
        );
    };
}

export default FormGen;