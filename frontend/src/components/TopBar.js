import React from 'react';
import logo from './resources/logo.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Media,
    Alert
} from 'reactstrap';

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className="TopBar" color="light" light expand="md">
                    <NavbarBrand href="/">
                        <Media object data-src="./resources/logo.png" alt="Slackers logo"></Media>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/home" className="nav-element">Find Jobs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login" className="nav-element">Log In</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret className="nav-element">
                                    Options
                    </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href="/myaccount">

                                        My Account
                 
                  </DropdownItem>
                                    <DropdownItem onClick={() => { alert("under development") }}>
                                        Organizational Chart
                  </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Log Out
                  </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
