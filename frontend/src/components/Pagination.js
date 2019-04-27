import React from 'react';
import { Pagination, PaginationItem, PaginationLink,Container } from 'reactstrap';

export default class JobPage extends React.Component {
  constructor(props) {
    super(props);
      this.state={
        pageNum:this.props.pageNum,
        pages:[],
        currentPage:this.props.currentPage
      }
    }

    componentWillReceiveProps(newProps) {
      const oldProps = this.props
      if(oldProps.pageNum != newProps.pageNum) {
        this.setState({pageNum:newProps.pageNum})
        this.setState({currentPage:newProps.currentPage})
        var ps = []
        for (let number = 1; number <=newProps.pageNum; number++) {
          ps.push(
            <PaginationItem active={number===Number(newProps.currentPage)}>
              <PaginationLink href={number}>
              {number}
            </PaginationLink>
          </PaginationItem>
          );
        }
        this.setState({pages:ps})
      }
    }

    componentDidMount(){

    }
  render(){
    return (

      <Pagination size="lg" aria-label="Pages for jobs" className='Pages' >
      {this.state.pages}

      </Pagination>
    );
  }
}
