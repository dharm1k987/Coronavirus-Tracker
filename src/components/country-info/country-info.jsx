import React, { Component } from 'react';
import { Overall, Table1 } from '../'
import axios from 'axios';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';


class CountryInfo extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      country: props.match.params.country,
      countryStats: {}
    }
  }

  toTitleCase(str) {
    const lowerStr = str.toLowerCase();
    if (str === "usa" || str == "uae" || str == "uk") return str.toUpperCase();
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  componentDidMount() {
    axios
      .get(`/live-stats/${this.state.country}`)
      .then(res => {
        const { countryStats }= res.data;
        this.setState({ countryStats });
        console.log(this.state.countryStats);
      });
  }

  render() {
    return (<div>
      <div className="flex mv3"> 
        <Overall placeName={this.toTitleCase(this.state.country)} place={this.state.countryStats} />
      </div>
      </div>
    );
  }
}

export default CountryInfo;
