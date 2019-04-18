import React, {Component} from 'react';
import {Container, Button, Row, Col, Form, FormGroup, Label, Input, FormText, Media} from 'reactstrap';
import ApplyModal from './ApplyModal';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as template from './api/formTemplate'
import * as formfunction from './api/formFunction';
import JobDesModal from './JobDesModal';
import PositionForm from './positionForm'
import FormGen from './FormGen';
import uuid from 'uuid'
import Axios from 'axios';
import {NavItem, NavLink} from 'reactstrap';

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
      const newPosition = {
          email: this.state.email,
          password: this.state.password,
      }
      //Axios.post('http://localhost:4000/api/positions/create',newPosition).then(res=>console.log(res.data));

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
                </Form>
                <Button className="LoginButton">Log In</Button>
                <NavLink href="/signup" className="signUpText">Dont Have and Account? Sign Up!</NavLink>
            </div>
        );
    }
}
export default LogInPage;
