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
<<<<<<< HEAD
import SignUpPage from './components/SignUpPage';
=======
import ChartPage from './components/ChartPage';
>>>>>>> 4faa84abafbb0ac69a24d846cfd31a2a299fdf07
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
<<<<<<< HEAD
            <Route path="/signup"  component={SignUpPage} />
=======
            <Route path="/chart" component={ChartPage} />
>>>>>>> 4faa84abafbb0ac69a24d846cfd31a2a299fdf07
            <Route path="/"  component={JobList} />
          </Switch>
        </Router>


        </div>

    );
  }
}

export default App;
