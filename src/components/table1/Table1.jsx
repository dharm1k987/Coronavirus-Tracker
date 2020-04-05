import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Table1.css"
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { v4 as uuidv4 } from 'uuid';

export class Table1 extends Component {


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  constructor(props) {
    super(props);
    
    this.handleSort = this.handleSort.bind(this);
    this.paginate = this.paginate.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

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
        { name: 'totalCases', title: 'Cases' }
      ],
      stats: [],
      filteredStats: [],
      searchValue: "",
      sort: 'upper',
      sortColumn: 'activeCases',
      page: 0,
      maxPerPage: 10
    };
  }



  static getDerivedStateFromProps(props, state) {

    if (state.stats.length === 0) {
      if (props.stats) {
        return {
          stats: props.stats,
          filteredStats: props.stats.sort((a, b) => a.activeCases < b.activeCases ? 1 : -1)
        }
      }
    }
    return null

  }

  filterCountryList(countryStr) {
    let column = this.state.sortColumn;
    let num = this.state.sort === 'upper' ? 1 : -1
    const orderedStats = this.state.stats.sort((a, b) => a[column] < b[column] ? num : -1*num);

    if (!countryStr.trim()) return this.setState({ searchValue: '', filteredStats: orderedStats})
    this.setState({
      searchValue: countryStr,
      page: 0,
      filteredStats: orderedStats
        .filter(s => s.country.toUpperCase().includes(countryStr.toUpperCase()))
    });
  }

  goToCountryInfo(countryStr) {
    console.log("Go to: ", countryStr);
  }

  handleSort(type) {

    if (this.state.sort === 'upper') this.setState({sort: 'lower'})
    else this.setState({sort: 'upper'})
    let num = this.state.sort === 'upper' ? 1 : -1

    // we should only be sorting based on what we see
    // if the search bar is empty, we do a sort on all of the data

    let noSeePrev = this.state.filteredStats.slice(0, this.state.maxPerPage * this.state.page)
    let userSee = this.state.filteredStats.slice(this.state.maxPerPage * this.state.page, this.state.maxPerPage * (this.state.page + 1))
    let noSeeNext = this.state.filteredStats.slice(this.state.maxPerPage * (this.state.page + 1))

    if (this.state.searchValue === '') {
      noSeePrev = []
      userSee = this.state.stats
      noSeeNext = []
    }

    let stats = this.state.stats.sort((a,b) => a[type] < b[type] ? num: -1*num)
    userSee.sort((a,b) => a[type] > b[type] ? num: -1*num)
    noSeePrev.push(...userSee, ...noSeeNext)
    this.setState({
      stats: stats,
      sortColumn: type,
      filteredStats: noSeePrev

    })     
  }

  paginate(e) {
    // if we are at a limit, don't do anything
    let page = this.state.page;
    if (page === 0 && e === 'back') return
    if (((Math.ceil(this.state.filteredStats.length / this.state.maxPerPage) - 1) < page + 1) && e === 'forward') return 
    this.setState({ page: e === 'back' ? page - 1 : page + 1 })
  
  }

  handlePageChange(e) {
    
    this.setState({ maxPerPage: parseInt(e.target.value, 10), page: 0 })
  }

  render() {
    return (
      <div>
        <div className="center">
          <div className="w-50-ns w-90 center br2 mt3">
            <input value={this.state.searchValue} onChange={(e) => this.filterCountryList(e.target.value)} placeholder="Search by country for latest news..." className="w-100 pa2 br2"></input>
          </div>
        </div>
        <div className="center">

          <table className="mv3 w-50-ns w-90 center ">
            <thead>
              <tr>
                {
                  [['Country', 'country'], ['Active Cases', 'activeCases'], ['New Cases','newCases'],
                   ['More']].map(e => {
                    return(
                    <th key={uuidv4()}>
                      {e[0] !== 'More' ? e[0] : null}
                      { e[0] !== 'More' ?
                      <span className="swap" style={this.state.sortColumn === e[1] ? {color: '#2962ff'} : null}>
                        <ImportExportIcon onClick={() => this.handleSort(e[1])}/>
                      </span>
                      : null }
                    </th>
                    )})
                }
              </tr>
            </thead>
            <tbody>

              {
                this.state.filteredStats.filter(s => s.country !== "TOTAL:").map(s => (
                  <tr key={s.country} onClick={() => this.goToCountryInfo(s.country.toUpperCase())}>
                    
                          <td>{s.country}</td>
                          <td>{this.numberWithCommas(s.activeCases)}</td>
                          {
                            s.newCases > 0 ? <td className="light-purple">+{this.numberWithCommas(s.newCases)}</td>
                            : <td>{this.numberWithCommas(s.newCases)}</td>
                          }
                          <td><a href={`/${s.country}`}><ArrowForwardIosIcon style={{"color":"cornflowerblue"}}/></a></td>
                    
                  </tr>)
                ).slice(this.state.page * this.state.maxPerPage, this.state.maxPerPage * (this.state.page + 1))
              }

            </tbody>
          </table>

            <div className="flex mt4 items-center mv3 w-50-ns w-90 center justify-center">
              <div className="flex flex-column items-center">
                <div>
                  <ArrowBackIcon className="backArrow" onClick={() => this.paginate('back')}></ArrowBackIcon>
                  <ArrowForwardIcon className="frontArrow" onClick={() => this.paginate('forward')}></ArrowForwardIcon>
                </div>
                <div className="ml2">Page: { this.state.page } of {Math.max(Math.ceil(this.state.filteredStats.length / this.state.maxPerPage) - 1, 0)}</div>
              </div>
              <div className="pl4">
                  <FormControl>
                    <select onChange={this.handlePageChange} defaultValue={this.state.maxPerPage} className="pl2 bg-white br2">
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={this.state.stats.length}>All</option>
                    </select>
                    <FormHelperText>Per Page</FormHelperText>
                  </FormControl>
              </div>

          </div>
        </div>

    </div>
    );
  }
}

export default Table1;