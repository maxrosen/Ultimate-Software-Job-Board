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
import jwt_decode from 'jwt-decode'

class Onboard extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
      return (
        <div class="personal-info-box" align="center">
            <Form onSubmit={this.onSubmit} id='form'>
                <FormGroup>
                    <Label for="position"><Media className="logo_s" src={require("./resources/logo_s.png")} alt="Slackers logo"></Media></Label>
                    <Input type="textarea" name="allergies" id="allergies" placeholder="List allergies here" class="personal-info-field" />
                    <label>
                      Select t-shirt size:     
                      <select value={this.state.value} onChange={this.handleChange}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                      </select>
                    </label>                </FormGroup>
                <Button className="submit" color="primary">Submit</Button>
            </Form>
        </div>      );
  }
}
export default Onboard;
