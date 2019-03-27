import React, {Component} from 'react';
import {Container, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class Job extends Component {
    render(){
    return(
    <Container className = 'Jobs'>
    <h1>{this.props.name}</h1>
    <p>alskdjflasdjkfasdfklj</p>
    <Button>Apply</Button>
    </Container>)
    }
}
export default Job;