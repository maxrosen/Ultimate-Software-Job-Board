import React, { Component } from 'react';
import PositionForm from './components/positionForm';
import FormGen from './components/FormGen';
import TopBar from './components/TopBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import JobList from './components/JobList'
import AccountPage from './components/AccountPage'
import ApplyModal from './components/ApplyModal';
import LogInPage from './components/LogInPage';
import SignUpPage from './components/SignUpPage';
import ChartPage from './components/ChartPage';
import ManEditJobs from './components/ManEditJobs';
import Onboard from './components/Onboard.js';
import ViewApplications from './components/ViewApplications.js';
import * as template from './components/api/formTemplate';
import './App.css';

class App extends Component {

  render() {
    return (

        <div className='App'>

		    <TopBar />
        <Router>
          <Switch  >
            <Route path="/myaccount"  component={AccountPage} />
            <Route path="/postjob" render={()=> <ApplyModal  isOpen={true} buttonLabel ="Add Job" template = {template.work}/> }/>
            <Route path="/login"  component={LogInPage} />
            <Route path="/signup"  component={SignUpPage} />
            <Route path="/chart" component={ChartPage} />
            <Route path="/editJobs" component={ManEditJobs} />
            <Route path="/onboard" component={Onboard} />
            <Route path="/viewapps" component={ViewApplications} />
            <Route path="/"  component={JobList} />

          </Switch>
        </Router>


        </div>

    );
  }
}

export default App;
