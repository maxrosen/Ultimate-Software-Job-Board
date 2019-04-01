import React, { Component } from 'react';
import {Container, Button } from 'reactstrap'
import ApplyModal from './ApplyModal';
import * as template from './api/formTemplate';
import * as formfunction from './api/formFunction';
import FormGen from './FormGen';
class AccountPage extends Component {
    render(){
        return (
            <React.Fragment>
                <ApplyModal key='1' buttonLabel='Add Job' children ={<FormGen template = {template.work} formfunction= {formfunction.createPosition}/>}/>
                <ApplyModal key= '2' buttonLabel='View Job' children ={<FormGen template = {template.work} formfunction= {formfunction.createPosition}/>}/>
                <ApplyModal key= '3'buttonLabel='Edit Job' children ={<FormGen template = {template.work} formfunction= {formfunction.createPosition}/>}/>
            </React.Fragment>
        );
    }
}
export default AccountPage;