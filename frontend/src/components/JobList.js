import React, {Component} from 'react';
import {Container, Button } from 'reactstrap'
import Job from './Job';
import ApplyModal from './ApplyModal';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import JobPage from './Pagination'
import * as template from './api/formTemplate'
class JobList extends Component {
    state = {
        positions:[
           { id: 1, name: 'Job1'},
           { id: 2, name: 'Job2'},
           { id: 3, name: 'Job3'},        
        ]
    }

    render(){
        const { jobs} = this.state;
        return(
            <Container>
                <ApplyModal buttonLabel ="Add Job" template = {template.work}/>
                {this.state.positions.map((pos)=>(<Job key={pos.id} name={pos.name}/>))}
                <JobPage />
            </Container>
        );
    }
}

export default JobList;