import React, { Component } from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';
import { Link } from 'react-router-dom';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import InfoIcon from '@material-ui/icons/Info';


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
      <div className="w-90 center ba bw1 b shadow-3 br3 bg-white f5 blue mt3">
      <Link to="/guide" className="flex justify-center">
        <InfoIcon className="mv2 mh2"/>
        <div className="mv2">What do I need to know?</div>
      </Link>

      </div>
      <Overall placeName={"World"} place={this.state.world}/>
      <Table1 stats={this.state.liveStats} />
      </div>
    );
  }
}

export default Home;
