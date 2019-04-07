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
                <Button size = 'lg' color="dark" onClick={()=>{alert('under development')}}>View Job</Button>
                <div></div>
                <Button size = 'lg' color="dark" onClick={()=>{alert('under development')}}>Edit Job</Button>
            </React.Fragment>
        );
    }
}
export default AccountPage;