import React, {Component} from 'react';
import {Container, Button, Row, Col } from 'reactstrap';
import ApplyModal from './ApplyModal';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import * as template from './api/formTemplate'
import * as formfunction from './api/formFunction';
import JobDesModal from './JobDesModal';
class Job extends Component {
    constructor(props){
        super(props);
        this.state={
            clicked: false
        }

        this.toggle=this.toggle.bind(this);
    }

    toggle() {
        console.log("clicked")
        this.setState(prevState => ({
            clicked: !prevState.clicked
        }));
      }

    render(){

    return(
    <Container className = 'Jobs'  >
    <JobDesModal clicked={this.state.clicked} />
    <h1 onClick={this.toggle} >{this.props.title}</h1>
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