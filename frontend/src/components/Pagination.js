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
      const oldProps = this.props;
      let range = 4;
      if(oldProps.pageNum !== newProps.pageNum || true) {
        this.setState({pageNum:newProps.pageNum})
        this.setState({currentPage:newProps.currentPage})
        var ps = []
        //ps.push(<PaginationItem active={})
        if(oldProps.currentPage!==1){
          ps.push(
            <PaginationItem active={false}>
              <PaginationLink href={1}>
                &lt;&lt;
              </PaginationLink>
            </PaginationItem>
          );
          ps.push(
            <PaginationItem active={false}>
              <PaginationLink href={oldProps.currentPage-1}>
                &lt;
              </PaginationLink>
            </PaginationItem>
          );
        }
        let pg = oldProps.currentPage-range;
        for (let number = Math.max(1, oldProps.currentPage-range); number <= Math.min(pg+range, newProps.pageNum); number++) {
          if(number===Number(newProps.currentPage))
            pg = number;
          ps.push(
            <PaginationItem active={number===Number(newProps.currentPage)}>
              <PaginationLink href={number}>
              {number}
            </PaginationLink>
          </PaginationItem>
          );
        }
        if(oldProps.currentPage !== newProps.pageNum){
          ps.push(
            <PaginationItem active={false}>
              <PaginationLink href={pg+1}>
                &gt;
              </PaginationLink>
            </PaginationItem>
          );
          ps.push(
            <PaginationItem active={false}>
              <PaginationLink href={newProps.pageNum}>
                &gt;&gt;
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

      <Pagination aria-label="Pages for jobs" className='Pages' >
        {this.state.pages}
      </Pagination>
    );
  }
}
