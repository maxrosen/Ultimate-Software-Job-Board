import React, {Component} from 'react';
import {Container, Button } from 'reactstrap'
import Job from './Job';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import JobPage from './Pagination'

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
                <Button color = 'dark'>
                    ADD JOB
                </Button>
                {this.state.positions.map((pos)=>(<Job name={pos.name}/>))}
                <JobPage />
            </Container>
        );
    }
}

export default JobList;