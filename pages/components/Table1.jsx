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
  TableHeaderRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import "../../styles/main.css"
import "../../styles/Table1.css"
import fetch from 'isomorphic-unfetch';





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



    this.state = {
      columns: [
        { name: 'country', title: 'Country' },
        { name: 'deaths', title: 'Deaths' },
        { name: 'cases', title: 'Cases' }
      ],
      rows: this.generateRows({ length: 6 })
  
    }
    
  }

  async componentDidMount() {
    // const res = await fetch('http://localhost:9000/live-stats');
    // const data = await res.json();
    // console.log("OLAAA");
    // console.log(data);
  }
  
  render() {
    // console.log(this.state.rows)
    return (
      <div className="tableDiv">
        <Grid
          rows={this.state.rows}
          columns={this.state.columns}
        >
        <SearchState />
        {/*
        <IntegratedFiltering />
        
        <SortingState
          defaultSorting={[{ columnName: 'deaths', direction: 'desc' }]} //asc or desc
        />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow showSortingControls /> */}
        {/* <TableHeaderRow /> */}

        {/* <Toolbar />
        <SearchPanel /> */}
       </Grid>
    </div>
    );
  }
}

export default Table1;

