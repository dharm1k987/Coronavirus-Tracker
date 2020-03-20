import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Table1.css"
import { Link } from 'react-router-dom';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


export class Table1 extends Component {

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  toTitleCase(str) {
    if (str === "usa" || str === "uae" || str === "uk") return str.toUpperCase();
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  constructor(props) {
    super(props);
    
    this.handleSort = this.handleSort.bind(this);

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
      stats: props.stats,
      filteredStats: props.stats ? props.stats.sort((a, b) => a.activeCases < b.activeCases ? 1 : -1) : [],
      searchValue: "",
      sort: 'upper',
      sortColumn: 'activeCases'
    };
  }

  filterCountryList(countryStr) {
    let column = this.state.sortColumn;
    let num = this.state.sort === 'upper' ? 1 : -1
    const orderedStats = this.state.stats.sort((a,b) => eval('a[column]') < eval('b[column]') ? num : -1*num);

    if (!countryStr.trim()) return this.setState({ searchValue: '', filteredStats: orderedStats})
    this.setState({
      searchValue: countryStr,
      filteredStats: orderedStats
        .filter(s => s.country.toLowerCase().includes(countryStr.toLowerCase()))
    });
  }

  goToCountryInfo(countryStr) {
    console.log("Go to: ", countryStr);
  }

  handleSort(type) {
    if (this.state.sort === 'upper') this.setState({sort: 'lower'})
    else this.setState({sort: 'upper'})
    let num = this.state.sort === 'upper' ? 1 : -1
    
    switch (type) {
      case 'country':
        let stats = this.state.stats.sort((a,b) => a.country > b.country ? num: -1*num)
        this.setState({
          stats: stats,
          sortColumn: 'country',
          filteredStats: this.state.searchValue.trim() ? this.state.filteredStats.sort((a,b) => a.country > b.country ? num: -1*num) : stats

        })      

        break;
      case 'activeCases':
        let stats1 = this.state.stats.sort((a,b) => a.activeCases > b.activeCases ? num: -1*num)
        this.setState({
          stats: stats1,
          sortColumn: 'activeCases',
          filteredStats: this.state.searchValue.trim() ? this.state.filteredStats.sort((a,b) => a.activeCases > b.activeCases ? num: -1*num) : stats1
        })
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <div className="center">
          <div className="w-70-ns w-90 center br2">
            <input value={this.state.searchValue} onChange={(e) => this.filterCountryList(e.target.value)} placeholder="Search by country for latest news..." className="w-100 pa2 br2"></input>
          </div>
        </div>
        <div className="mv3 pa1 w-70-ns w-90 center mh2">
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
              this.state.filteredStats.filter(s => s.country !== "total:").map(s => (
                <div key={s.country} onClick={(e) => this.goToCountryInfo(s.country.toLowerCase())}>
                  <Link to={`/${s.country}`}>
                      <div className="br3 flex mv2 pt1 ba b--moon-gray bg-white">
                        <p className="dark-gray ma0 w-50 pv2 pl4">{this.toTitleCase(s.country)}</p>
                        <p className="dark-gray ma0 w-40 pa2 tc">{this.numberWithCommas(s.activeCases)}</p>
                        <div className="w-10 pv2 pr2 center mid-gray">
                          <ArrowForwardIosIcon style={{"color":"cornflowerblue"}}/>
                        </div>
                      </div>
                  </Link>
                </div>)
              )
            }
          </div>
        </div>
    </div>
    );
  }
}

export default Table1;