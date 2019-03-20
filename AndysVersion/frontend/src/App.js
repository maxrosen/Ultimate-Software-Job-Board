import React, { Component } from 'react';
import AppForm from './components/form';
import List from './components/list';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
     
        <div className='App'>

        <Router path="/create" exact component={AppForm} >
            <AppForm />
        </Router>




        </div>

    );
  }
}

export default App;