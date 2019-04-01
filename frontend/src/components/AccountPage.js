import React, { Component } from 'react';
import {Container, Button } from 'reactstrap'
import ApplyModal from './ApplyModal';
import * as template from './api/formTemplate';
class AccountPage extends Component {
    render(){
        return (
            <React.Fragment>
            <ApplyModal key ='1' buttonLabel ="Add Job" template = {template.work}/>
            <ApplyModal key ='2' buttonLabel ="Edit Job" template = {template.work}/>
            <ApplyModal key ='3' buttonLabel ="View All Job" template = {template.work}/>
            </React.Fragment>
        );
    }
}
export default AccountPage;