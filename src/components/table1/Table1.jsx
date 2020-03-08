import React, { Component,  useState } from 'react';
// import fetch from "isomorphic-unfetch";
import {
  SearchState,
  IntegratedFiltering,
  IntegratedSorting,
  SortingState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  PagingPanel,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import {
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import "./Table1.css"


export class Table1 extends Component {

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


  generateRows() {
      const countries = ["Canada", "USA", "China", "Italy", "Russia", "Belgium", "Slovakia"]
      return countries.map((country) => {
          return {country: country, deaths: this.getRandomInt(1,200), cases: this.getRandomInt(200, 400)}
      })  
    }

  constructor(props) {
    super(props);
    this.generateRows = this.generateRows.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);

    // activeCases: 23605
    // country: "China"
    // newCases: 167
    // newDeaths: 30
    // seriousAndCritical: 5737
    // totalCases: 99999
    // totalDeaths: 3042
    // totalRecovered: 53929


    this.state = {
      columns: [
        { name: 'country', title: 'Country' },
        { name: 'totalDeaths', title: 'Deaths' },
        { name: 'totalCases', title: 'Cases' }
      ]
      // rows: this.generateRows({ length: 6 })
  
    }

    
    
  }

  render() {
    // console.log(this.state.rows)
    return (
      <div className="tableDiv">
        <Grid
          rows={
            this.props.data.length > 0 ? this.props.data : []
          }
          columns={this.state.columns}
        >
        <SearchState />
        
        <IntegratedFiltering />
        
        <SortingState
          defaultSorting={[{ columnName: 'totalDeaths', direction: 'desc' }]} //asc or desc
        />
        <IntegratedSorting />

        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <IntegratedPaging />
        <PagingPanel
          pageSizes={[5,10,15,20]}
        />
        <Table />
        <TableHeaderRow showSortingControls />

        <Toolbar />
        <SearchPanel />
       </Grid>
    </div>
    );
  }
}

export default Table1;

