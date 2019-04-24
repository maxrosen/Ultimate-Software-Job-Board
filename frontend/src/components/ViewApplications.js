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
        <button>TEST</button>
      );
  }
}
export default ViewApplications;
