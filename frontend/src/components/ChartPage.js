import React, { Component } from 'react';
import { Container, Button, UncontrolledTooltip } from 'reactstrap';
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

const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width: 120,
    height: 120,
    x: -60,
  }
}

const companyId = 1;
const minzoom = 0.1;
const maxzoom = 5;

class NodeLabel extends React.PureComponent {
	render() {
    const {className, nodeData} = this.props
    const name = nodeData.name
    let email
    if(nodeData.email){
        email = <a style={{"color":'purple','text-decoration': 'underline'}} onClick={e=>alert(nodeData.email)}>EMail</a>
    }
    else{
        email = null
    }
    return (
      <div className={className}>
		  <h2 style={{'font-size':18}}>{name}</h2>
		  <p style={{'margin':0}}>{nodeData.title}</p>
        {email}
	  </div>
    );
  }
}
class ChartPage extends Component {

    constructor(props){
        super(props)
        this.state = {
            employees:[
			],
            tree:{},
            zoomsize:1

        }
        this.buildtree = this.buildtree.bind(this)
        this.zoomIn = this.zoomIn.bind(this)
        this.zoomOut = this.zoomOut.bind(this)
    }
	
	
    buildtree(node,id,list){
       
        var tree={
            name: node.firstName+" "+node.lastName,
            email: node.email,
            title: node.positionTitle,
            children:[]
        }

        if (node!=undefined||node!=='') {
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
            //user.companyId=1
            //Replace "user.companyId" with "1" to view the tree for Crystal Security.
            let url = "/api/employees/getCompany/"+user.companyId;
            axios.get(url).then(
                (res)=> {
                    var employeesList = lodash.groupBy(res.data,'managerId');
                    if(employeesList['undefined']){
                        var tree = this.buildtree(employeesList['undefined'][0],1,employeesList)
                        console.log(tree)
                        this.setState({employees:employeesList,tree:tree});
                    }

                    const dimensions = this.treeContainer.getBoundingClientRect();
                    this.setState({
                      translate: {
                        x: dimensions.width / 2,
                        y: dimensions.height / 2
                      }
                    });
            console.log(this.state);});
		}
	}

    zoomIn() {
        const temp = this.state.zoomsize
        if (temp < maxzoom) {
            this.setState({ zoomsize: temp + 0.25 });
        }
    }

    zoomOut() {
        const temp = this.state.zoomsize
        if (temp > minzoom) {
            this.setState({ zoomsize: temp - 0.25 });
        }
    }

    render() {
        return (
            <Container>
                <div className="treeGraph" align="center" ref={tc => (this.treeContainer = tc)}>
                    <div className="chartButtonsAlign">
                        <button className="chartButton" onClick={this.zoomIn} > +</button>
                        <button className="chartButton" onClick={this.zoomOut} > -</button>
                    </div>
                    <Tree className="treeGraph"
                        zoomable={true}
                        scaleExtent={{ min: minzoom, max: maxzoom }}
                        zoom={this.state.zoomsize}
                        translate={this.state.translate}
                        allowForeignObjects
                        nodeLabelComponent={{
                            render: <NodeLabel className='myLabelComponentInSvg' />,
                            foreignObjectWrapper: {
                                x: -60
                            }
                        }}
                        orientation={"vertical"}
                        data={this.state.tree}
                        nodeSvgShape={svgSquare}
                                    
                       
                    >


                    </Tree>

                   </div>
            </Container>)

        }
    

}
export default ChartPage;
