import React, { Component } from 'react';
import {Container, Button } from 'reactstrap'
import ApplyModal from './ApplyModal';
import * as template from './api/formTemplate';
import * as formfunction from './api/formFunction';
import FormGen from './FormGen';
import {
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class AccountPage extends Component {
    render(){
        return (
            <React.Fragment>
                    <UncontrolledDropdown > 
                        <DropdownToggle nav caret> Import Data </DropdownToggle>
                        <DropdownMenu center>
                           <DropdownItem href="/importPage">Add Employees</DropdownItem>
                           <DropdownItem href="/importPage">Add Positions</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                <ApplyModal key='1' buttonLabel='Add Job' children ={<FormGen template = {template.work} formfunction= {formfunction.createPosition}/>}/>
                <Button className="greenButton" size = 'lg' color="dark" onClick={()=>{alert('under development')}}>View Job</Button>
                <Button className="greenButton" size = 'lg' color="dark">View Applications</Button>
                <Button href="/onboard" className="greenButton" size = 'lg' color="dark">Edit Personal Information</Button>

            </React.Fragment>
        );
    }
}
export default AccountPage;
