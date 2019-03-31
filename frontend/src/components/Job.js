import React, {Component} from 'react';
import {Container, Button, Row, Col } from 'reactstrap';
import ApplyModal from './ApplyModal';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as template from './api/formTemplate'
import * as formfunction from './api/formFunction';
class Job extends Component {
    render(){
    return(
    <Container className = 'Jobs'>
    <h1>{this.props.title}</h1>
    <p>{this.props.description}</p>
    <Row>
        <Col md = {{size:3,offset:9} }>
		<ApplyModal buttonLabel='Apply' template = {template.apply} formfunction= {formfunction.createPosition}/>
        </Col>
        
    </Row>
   
    </Container>)
    }
}
export default Job;