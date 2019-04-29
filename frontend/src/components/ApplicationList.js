import React, {Component} from 'react';
import {Container, Button } from 'reactstrap'
import ViewApplications from './ViewApplications';
import JobPage from './Pagination';
import * as template from './api/formTemplate';
import * as listFunction from './api/listFunction';

class ApplicationList extends Component {
  constructor(props){
      super(props)
      this.state = {
          currentPage:0,
          positionscnt:5,
          applications:[

          ]
      }

  }

  componentDidMount(){
      const{match:{params}}=this.props;
      this.setState({currentPage:params.page});
      listFunction.getApps(params.page).then((data)=> this.setState({applications:data}));
      listFunction.getAppCount().then((data)=>this.setState({positionscnt:data}));
  }

  render(){

      return(
          <Container>
              {this.state.applications.map((pos)=>(<ViewApplications key={pos._id} id={pos._id} position={pos.position} name={pos.name} phonenumber={pos.phonenumber}/>))}
          </Container>
      );
  }
}

export default ApplicationList;
