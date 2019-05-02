import React, {Component} from 'react';
import {Container, Button } from 'reactstrap'
import ViewApplications from './ViewApplications';
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
            <br></br><h1 className= "titleHome" align = "center">Current Applications</h1>
              {this.state.applications.map((pos)=>(<ViewApplications key={pos._id} id={pos._id} position={pos.position} positionid={pos.positionid} first_name={pos.first_name} last_name={pos.last_name} phonenumber={pos.phonenumber} email={pos.email}/>))}
          </Container>
      );
  }
}

export default ApplicationList;
