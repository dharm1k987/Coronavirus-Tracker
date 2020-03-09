import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import "./Table1.css"
import { Link } from 'react-router-dom';


export class Table1 extends Component {

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  toTitleCase(str) {
    const lowerStr = str.toLowerCase();
    if (str === "usa" || str == "uae" || str == "uk") return str.toUpperCase();
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

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
        { name: 'totalCases', title: 'Cases' }
      ],
      stats: [],
      filteredStats: [],
      searchValue: ""
      // rows: this.generateRows({ length: 6 })
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (!prevState.filteredStats.length) {
      return { stats: nextProps.stats.stats ? nextProps.stats.stats : prevState.stats, filteredStats: nextProps.stats.stats ? nextProps.stats.stats : [] };
    }
    else return null;
  }
 
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.stats.length !== this.props.stats.length){
        this.setState({ stats: this.props.stats, filteredStats: this.props.stats ? this.props.stats : [] });
    }
  }

  filterCountryList(countryStr) {
    this.setState({
      searchValue: countryStr,
      filteredStats: this.state.stats.filter(s => s.country.toLowerCase().includes(countryStr.toLowerCase()))
    });
  }

  goToCountryInfo(countryStr) {
    console.log("Go to: ", countryStr);
  }

  render() {
    return (
      <div>
        <div className="center">
          <div className="w-90 center mh2 br2">
            <input value={this.state.searchValue} onChange={(e) => this.filterCountryList(e.target.value)} placeholder="Search by country for latest news..." className="w-100 pa2 br2"></input>
          </div>
        </div>
        <div className="pre br2 mv3 pa1 w-90 center mh2 shadow-1">
          <div>
            <div className="fl w-50 pv2 pl4 b bg-moon-gray">Country</div>
            <div className="fl w-50 pa2 tc b bg-moon-gray">Active Cases</div>
          </div>
          <div>
            {
              this.state.filteredStats.filter(s => s.country !== "total:").map(s => (
                <div key={s.country} className="br2" onClick={(e) => this.goToCountryInfo(s.country.toLowerCase())}>
                  <Link to={`/${s.country}`}>
                    <div className="dark-gray fl w-50 mt1 pv2 pl4 bg-near-white">{this.toTitleCase(s.country)}</div>
                    <div className="dark-gray fl w-50 mt1 pa2 tc bg-near-white">{this.numberWithCommas(s.activeCases)}</div>
                    {this.state.searchValue.length ? <div className="dark-gray fl w-100 tc f6 bg-near-white ph2 pv1">click for more info</div> : <div></div>}
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

