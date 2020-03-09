import React, { Component } from 'react';
import { Overall, Table1 } from '../'
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
      }
    }
  }

  componentDidMount() {
    axios
      .get('/live-stats')
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
      <div className="flex mv3">
          <div className="center flex">
            <p className="ma0"> Live </p>
            <div><RadioButtonCheckedIcon className="liveBtn"/> </div>
          </div>
        </div>
        <Overall placeName={"WORLD"} place={this.state.world}/>
      <Table1 stats={this.state.liveStats} />
      </div>
    );
  }
}

export default Home;
