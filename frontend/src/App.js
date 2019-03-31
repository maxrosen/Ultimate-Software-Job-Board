import React, { Component } from 'react';
import PositionForm from './components/positionForm';
import FormGen from './components/FormGen';
import TopBar from './components/TopBar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";import 'bootstrap/dist/css/bootstrap.min.css';
import JobList from './components/JobList'
import './App.css';

class App extends Component {

  render() {
    return (
     
        <div className='App'>
		
		    <TopBar />
        <Router  >
          <Route exact path="/"  component={JobList} />
      
        </Router>
        

        </div>

    );
  }
}

export default App;