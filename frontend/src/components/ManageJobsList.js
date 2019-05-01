import React, {Component} from 'react';
import {Container, Button } from 'reactstrap'
import ManageJobs from './ManageJobs';
import * as template from './api/formTemplate';
import * as listFunction from './api/listFunction';

class ManageJobsList extends Component {
  constructor(props){
      super(props)
      this.state = {
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
            <br></br><h1 className= "titleHome" align = "center">Current Positions</h1>
              {this.state.positions.map((pos)=>(<ManageJobs key={pos._id} id={pos._id} title={pos.title} company={pos.companyName} description={pos.description} postedDate={pos.postedDate} companyName={pos.companyName}/>))}
          </Container>
      );
  }
}

export default ManageJobsList;
