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

class ViewApplications extends Component {
  render(){
      return (
        <Container className = 'Jobs'  >
        <h1></h1>
        <h1>{this.props.title}</h1>
        <p>{this.props.company}</p>
        <p>{this.props.description}</p>
        <Row>
          <Col md = {{size:2,offset:10} }>
          <button size='lg' className = "greenButton" onClick={this.openModal}>Email Applicant</button>
           <button size='lg' className = "greenButton" onClick={this.openModal}>Accepted</button>
          </Col>
        </Row>
        </Container>
      );
  }
}
export default ViewApplications;
