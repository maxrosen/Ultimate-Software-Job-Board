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
                <Button className="greenButton" size = 'lg' color="dark">import</Button>
            </React.Fragment>
        );
    }
}
export default AccountPage;
