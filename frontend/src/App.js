import React, { Component } from 'react';
import PositionForm from './components/positionForm';
import FormGen from './components/FormGen';
import TopBar from './components/TopBar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";import 'bootstrap/dist/css/bootstrap.min.css';
import JobList from './components/JobList'
import AccountPage from './components/AccountPage'
import ApplyModal from './components/ApplyModal';
import LogInPage from './components/LogInPage'
import * as template from './components/api/formTemplate'
import './App.css';

class App extends Component {

  render() {
    return (

        <div className='App'>

		    <TopBar />
        <Router  >
          <Route path="/home"  component={JobList} />
          <Route path="/myaccount"  component={AccountPage} />
          <Route path="/postjob" render={()=> <ApplyModal  isOpen={true} buttonLabel ="Add Job" template = {template.work}/> }/>
          <Route path="/login"  component={LogInPage} />
        </Router>


        </div>

    );
  }
}

export default App;
