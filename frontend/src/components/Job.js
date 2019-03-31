import React, {Component} from 'react';
import {Container, Button, Row, Col } from 'reactstrap';
import ApplyModal from './ApplyModal';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as template from './api/formTemplate'
class Job extends Component {
    render(){
    return(
    <Container className = 'Jobs'>
    <h1>{this.props.name}</h1>
    <p>alskdjflasdjkfasdfklj</p>
    <Row>
        <Col md = {{size:3,offset:9} }>
		<ApplyModal buttonLabel='Apply' template = {template.apply} />
        </Col>
        
    </Row>
   
    </Container>)
    }
}
export default Job;