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

class EditCustomQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = { inputs: ['input-0'] };
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
        return(
            <div>
               <button onClick={ () => this.appendInput() }>
                   Click to add Custom Question
               </button>
            </div>
        );
    }

    appendInput() {
        var newInput = `input-${this.state.inputs.length}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    }
}
export default EditCustomQuestions;
