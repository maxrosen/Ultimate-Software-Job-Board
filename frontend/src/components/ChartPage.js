import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import Tree from 'react-d3-tree';
import axios from 'axios';
import lodash from 'lodash'

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
        name: 'Child One',
        children:[
            {
                name: 'child three'
            }
        ]
    }, {
        name: 'Child Two'
    }]
};
class ChartPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            employees:[
       
            ],
            tree:{}

        }
        this.buildtree=this.buildtree.bind(this)
    }

    buildtree(node,id,list){
       
        var tree={
            name: node.firstName+" "+node.lastName,
            attributes: {
                email:node.email,
                title: node.positionTitle
              },
            children:[]
        }
        if (node!=undefined||node!='') {
            for (var k in list[id]){
                var temp = this.buildtree(list[id][k],list[id][k]['employeeId'],list)
                tree.children.push(temp)
            }
         }

        return tree;
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/employees/getCompany/1').then(
            (res)=> {
                var employeesList = lodash.groupBy(res.data,'managerId');
                var tree = this.buildtree(employeesList['undefined'][0],1,employeesList)
                console.log(tree)
                this.setState({employees:employeesList,tree:tree});
        console.log(this.state);});
    }

    render() {
        return (
            <Container>
                <h1 className="label">Company Hierarchy</h1>
                <div className="treeGraph" align="center" >
                    <Tree
                        orientation={"vertical"}
                        data={this.state.tree}
                    />
                </div>
            </Container>
        );
    }
}
export default ChartPage;