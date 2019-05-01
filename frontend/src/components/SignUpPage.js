import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Media} from 'reactstrap';
import Axios from 'axios';

class SignUpPage extends Component {
  constructor(){
      super();
      this.state={
          first_name: '',
          last_name: '',
          email: '',
          password: '',
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  }

  onChange(event){
      this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(e) {
      e.preventDefault();
      console.log(`Form submitted:`);

      var email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
      if(!email_regex.test(this.state.email)){
        alert('Invalid email address');
      }

      else{
        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
        }
        Axios.post('http://localhost:4000/api/users/register',newUser).then(res=>{
            console.log(res.data.success)
            if (res.data.success){
                alert('Successfully signed up!');
                window.location.href='/login';
                console.log(window.location.href)
            }
            else{alert('Sign Up Failed');} 
        });
        this.setState({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        });
      }
  }

    render() {
        return (
            <div class="log-in-box" align="center">
                <Form onSubmit={this.onSubmit} id='form'>
                    <FormGroup>
                        <Label for="position"><Media className="logo_s" src={require("./resources/logo_s.png")} alt="Slackers logo"></Media></Label>
                        <Input type="text" name="first_name" id="first_name" placeholder="First name" class="log-in-field" value={this.state.first_name || ""} onChange={this.onChange.bind(this)} />
                        <Input type="text" name="last_name" id="last_name" placeholder="Last name" class="log-in-field" value={this.state.last_name || ""} onChange={this.onChange.bind(this)} />
                        <Input type="text" name="email" id="email" placeholder="Email" class="log-in-field" value={this.state.email || ""} onChange={this.onChange.bind(this)} />
                        <Input type="password" name="password" id="password" placeholder="Password" class="log-in-field" value={this.state.password || ""} onChange={this.onChange.bind(this)} />
                    </FormGroup>
                    <Button className="LoginButton">Sign Up</Button>
                </Form>
                
            </div>
        );
    }
}
export default SignUpPage;
