import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import Tree from 'react-d3-tree';

const svgRect = {
    shape: 'rect',
    shapeProps: {
        width: 150,
        height: 60,

    }
}

const data = {
    name: 'Parent',
    children: [{
        name: 'Child One'
    }, {
        name: 'Child Two'
    }]
};
class ChartPage extends Component {
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
