import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import Tree from 'react-d3-tree';
import axios from 'axios';
import lodash from 'lodash';
import jwt_decode from 'jwt-decode';

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
        if(localStorage.jwttoken){
            let user = jwt_decode(localStorage.jwttoken);
            //Replace "user.companyId" with "1" to view the tree for Crystal Security.
            let url = "http://localhost:4000/api/employees/getCompany/"+user.companyId;
            console.log(user);
            axios.get(url).then(
                (res)=> {
                    var employeesList = lodash.groupBy(res.data,'managerId');
                    if(employeesList['undefined']){
                        var tree = this.buildtree(employeesList['undefined'][0],1,employeesList)
                        console.log(tree)
                        this.setState({employees:employeesList,tree:tree});
                    }
            console.log(this.state);});
        }
    }

    render() {
        if(localStorage.jwttoken && this.state.employees.undefined){
            return (
                <div align="center">
                    <div className="label">
                        <h1 className="compText">Company Hierarchy</h1>
                    </div>
                    <div className="treeGraph">
                        <Tree
                            //nodeSvgShape={svgRect}
                            orientation={"vertical"}
                            data={this.state.tree}
                        />
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <br></br>
                    <div align="center">Please log in with an account associated with your employer to view this feature.</div>
                </div>
            );
        }
    }
}
export default ChartPage;
