import React, { Component } from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';


class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      liveStats: {},
      world: {
        totalDeaths: "",
        activeCases: "",
        totalRecovered: "",
        totalCases: ""
      }
    }
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/live-stats`)
      .then(res => {
        const world = res.data.stats.filter(s => s.country === "total:")[0];
        this.setState({
          liveStats: res.data.stats,
          world
        });
      });
  }

  render() {
    return (<div>
        <Overall placeName={"World"} place={this.state.world}/>
      <Table1 stats={this.state.liveStats} />
      </div>
    );
  }
}

export default Home;
