import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Media} from 'reactstrap';
import axios from 'axios';
import {NavLink} from 'reactstrap';
import jwt_decode from 'jwt-decode'

class LogInPage extends Component {
  constructor(){
      super();
      this.state={
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
      const userCred = {
          email: this.state.email,
          password: this.state.password,
      }
      axios.post('/api/users/login',userCred).then(res=>{
        localStorage.clear()
        if(res.data.success){
        localStorage.setItem('jwttoken',res.data.token)
        if(localStorage.jwttoken){
            console.log(jwt_decode(localStorage.jwttoken));
            localStorage.setItem('user',JSON.stringify(jwt_decode(localStorage.jwttoken)))
        }
        window.location.href='/';
    }
    else{
        alert("Invalid Credentials")
    }
    });


      this.setState({
          email: '',
          password: '',
      });
  }

    render() {
        return (
            <div class="log-in-box" align="center">
                <Form onSubmit={this.onSubmit} id='form'>
                    <FormGroup>
                        <Label for="position"><Media className="logo_s" src={require("./resources/logo_s.png")} alt="Slackers logo"></Media></Label>
                        <Input type="text" name="email" id="email" placeholder="Email" class="log-in-field" value={this.state.email || ""} onChange={this.onChange.bind(this)} />
                        <Input type="password" name="password" id="password" placeholder="Password" class="log-in-field" value={this.state.password || ""} onChange={this.onChange.bind(this)} />
                    </FormGroup>
                    <Button className="LoginButton">Log In</Button>
                </Form>
                <NavLink href="/signup" className="signUpText">Dont Have and Account? Sign Up!</NavLink>
            </div>
        );
    }
}
export default LogInPage;
