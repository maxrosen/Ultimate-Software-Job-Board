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

class NodeLabel extends React.PureComponent {
	render() {
    const {className, nodeData} = this.props
	const name = nodeData.name
    return (
      <div className={className}>
		  <h2 style={{'font-size':18}}>{name}</h2>
		  <p>{nodeData.title}</p>
        <a onClick={e=>alert(nodeData.email)}>EMail</a>
	  </div>
    )
  }
}
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

    render() {
        return (
            <Container>
                <div className="treeGraph" align="center"  ref={tc => (this.treeContainer = tc)}>
                    <Tree className = "treeGraph"
                    translate={this.state.translate}
                   
					allowForeignObjects
					nodeLabelComponent={{
						render: <NodeLabel className='myLabelComponentInSvg' />,
						foreignObjectWrapper: {
							x:-60
						}
					}}
                        orientation={"vertical"}
                        data={this.state.tree}
						nodeSvgShape={svgSquare}
                    />
                   </div>
            </Container>)

        }
    

}
export default ChartPage;
