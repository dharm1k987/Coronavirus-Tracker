import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Table1.css"
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
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
    const orderedStats = this.state.stats.sort((a, b) => eval('a[column]') < eval('b[column]') ? num : -1*num);

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
      
    switch (type) {
      case 'country':
        let stats = this.state.stats.sort((a,b) => a.country > b.country ? num: -1*num)
        userSee.sort((a,b) => a.country > b.country ? num: -1*num)
        noSeePrev.push(...userSee, ...noSeeNext)
        this.setState({
          stats: stats,
          sortColumn: 'country',
          filteredStats: noSeePrev

        })      

        break;
      case 'activeCases':
        let stats1 = this.state.stats.sort((a,b) => a.activeCases > b.activeCases ? num: -1*num)
        userSee.sort((a,b) => a.activeCases > b.activeCases ? num: -1*num)
        noSeePrev.push(...userSee, ...noSeeNext)
        this.setState({
          stats: stats1,
          sortColumn: 'activeCases',
          filteredStats: noSeePrev
        })
        break;
    
      default:
        break;
    }
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
          <div className="w-70-ns w-90 center br2 mt3">
            <input value={this.state.searchValue} onChange={(e) => this.filterCountryList(e.target.value)} placeholder="Search by country for latest news..." className="w-100 pa2 br2"></input>
          </div>
        </div>
        <div className="mv3 w-70-ns w-90 center mh2">



           <div className="ba flex pv2 bg-light-gray br3">
            <div className="w-50 pv2 pl4 b">Country
              <span className="swap" style={this.state.sortColumn === 'country' ? {color: '#2962ff'} : null}>
                <ImportExportIcon onClick={() => this.handleSort('country')}/>
              </span>
            </div>
            <div className="w-40 pv2 tc b">Active Cases
              <span className="swap" style={this.state.sortColumn === 'activeCases' ? {color: '#2962ff'} : null}>
                <ImportExportIcon onClick={() => this.handleSort('activeCases')}/>
              </span>
            </div>
          </div>
          
          <div>
            {
              this.state.filteredStats.filter(s => s.country !== "TOTAL:").map(s => (
                <div key={s.country} onClick={() => this.goToCountryInfo(s.country.toUpperCase())}>
                  <a href={`/${s.country}`}>
                      <div className="br3 flex mv2 pt1 ba b--moon-gray bg-white items-center">
                        <p className="dark-gray ma0 w-50 pv2 pl4">{s.country}</p>
                        <p className="dark-gray ma0 w-40 pa2 tc">{this.numberWithCommas(s.activeCases)}</p>
                        <div className="w-10 pv2 pr2 center mid-gray">
                          <ArrowForwardIosIcon style={{"color":"cornflowerblue"}}/>
                        </div>
                      </div>
                  </a>
                </div>)
              ).slice(this.state.page * this.state.maxPerPage, this.state.maxPerPage * (this.state.page + 1))
            }
          </div> 

          <div className="flex justify-around mt4 items-center">
            <div className="flex flex-column items-center">
              <div>
                <ArrowBackIcon className="backArrow" onClick={() => this.paginate('back')}></ArrowBackIcon>
                <ArrowForwardIcon className="frontArrow" onClick={() => this.paginate('forward')}></ArrowForwardIcon>
              </div>
              <div className="ml2">Page: { this.state.page } of {Math.ceil(this.state.filteredStats.length / this.state.maxPerPage) - 1}</div>
            </div>
            <div>
                <FormControl className="pl2">
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