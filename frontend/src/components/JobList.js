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
            currentPage:0,
            positionscnt:5,
            positions:[
       
            ]
        }
        
    }

    componentDidMount(){
        const{match:{params}}=this.props;
        this.setState({currentPage:params.page});
        listFunction.getList(params.page).then((data)=> this.setState({positions:data}));
        listFunction.getCount().then((data)=>this.setState({positionscnt:data}));
    }

    render(){

        return(
            <Container>
                {this.state.positions.map((pos)=>(<Job key={pos._id} id={pos._id} title={pos.title} company={pos.companyName} description={pos.description}/>))}
                <JobPage pageNum={Math.ceil(this.state.positionscnt/6.0)} currentPage={this.state.currentPage}/>
            </Container>
        );
    }
}

export default JobList;