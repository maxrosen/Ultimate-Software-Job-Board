import React from 'react';
import jwt_decode from 'jwt-decode'
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
    Media
} from 'reactstrap';

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout=this.logout.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            isLoggedIn : false,
            token: '',
            loginbutton:<NavLink href="/login" className="nav-element">Log In</NavLink>
        };
    }

    logout(){
        localStorage.clear();
        window.location.href='/';
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    //remember to put not back
    componentDidMount(){
        if(!localStorage.jwttoken){
            this.setState({ loginbutton: <NavLink href="/login" className="nav-element">Log In</NavLink>});
        }
        else{
            let user = jwt_decode(localStorage.jwttoken);
            let orgchart 
            if (user.companyId!=-1){
                console.log(user.companyId)
                orgchart=                        <DropdownItem href="/chart">
                Organizational Chart
                </DropdownItem>
            }
           
            this.setState({
                loginbutton:<UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="nav-element">
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/myaccount">My Account
                                    </DropdownItem>
                        {orgchart}
                        <DropdownItem divider />
                        <DropdownItem href="/1" onClick={this.logout} >Log Out</DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>});
        }
    }

    render() {

        return (
            <div>
                <Navbar className="TopBar" color="light" light expand="md">
                    <NavbarBrand href="/">
                        <Media className="logo" src={require('./resources/logo.png')} alt="Slackers logo"></Media>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/1" className="nav-element">Find Jobs</NavLink>
                            </NavItem>
                            <NavItem>
                                {this.state.loginbutton}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
