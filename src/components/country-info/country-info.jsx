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
        <Overall placeName={this.state.country} place={this.state.countryStats} />
      </div>
      </div>
    );
  }
}

export default CountryInfo;
