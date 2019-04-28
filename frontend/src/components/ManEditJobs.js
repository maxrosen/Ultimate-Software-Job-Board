import React, {Component} from 'react';
import {Container, Button } from 'reactstrap'
import Job from './Job';
import JobPage from './Pagination';
import * as template from './api/formTemplate';
import * as listFunction from './api/listFunction';

class JobList extends Component {
    constructor(props){
        super(props)
        this.state = {
            positions:[
       
            ]
        }
    }

    componentDidMount(){
        listFunction.getList().then((data)=> this.setState({positions:data}));
    }

    render(){
        const { jobs} = this.state;
        return(
            <Container>
                {this.state.positions.map((pos)=>(<Job key={pos._id} id={pos._id} title={pos.title} company={pos.companyName} description={pos.description}/>))}
                <JobPage />
            </Container>
        );
    }
}

export default JobList;