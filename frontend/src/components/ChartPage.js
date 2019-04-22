import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import Tree from 'react-d3-tree';
import axios from 'axios';

const svgRect = {
    shape: 'rect',
    shapeProps: {
        width: 150,
        height: 60,

    }
}

const companyId = 1;


const data = {
    name: 'Parent',
    children: [{
        name: 'Child One'
    }, {
        name: 'Child Two'
    }]
};
class ChartPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            employees:[
       
            ]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/employees/getCompany/1').then((res)=> {this.setState({employees:res.data});console.log(this.state);});
    }

    render() {
        return (
            <Container>
                <h1 className="label">Company Hierarchy</h1>
                <div className="treeGraph" align="center" >
                    <Tree
                        orientation={"vertical"}
                        data={data}
                    />
                </div>
            </Container>
        );
    }
}
export default ChartPage;