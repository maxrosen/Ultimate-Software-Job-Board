import React, { Component } from 'react';
import PositionForm from './components/positionForm';
import TopBar from './components/TopBar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
     
        <div className='App'>
		
		<TopBar />
		
        <Router path="/create" exact component={PositionForm} >
          <PositionForm />
        </Router>

        </div>

    );
  }
}

export default App;