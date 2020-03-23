import React from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';
import { Link } from 'react-router-dom';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import InfoIcon from '@material-ui/icons/Info';

const fs = require('fs')
const moment = require('moment')


class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      liveStats: null,
      world: null,
      timelines: null
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

    axios
    .get('/timelines')
    .then(res => {
      let dates = res.data.timelinesConfirmed[0].data.map(a => Object.keys(a)[0]);
      dates = dates.map(slashDate => moment(slashDate, 'MM/DD/YYYY').format('MMM D'))
      let confirmedSum = dates.map(() => 0)
      let recoveredSum = dates.map(() => 0)
      let deathSum = dates.map(() => 0)

      let numRecords = res.data.timelinesConfirmed.length;

      for (let i = 0; i < numRecords; i++) {
        res.data.timelinesConfirmed[i].data.forEach((f, index) => {
          confirmedSum[index] += f[Object.keys(f)]
        })
        res.data.timelinesRecovered[i].data.forEach((f, index) => {
          recoveredSum[index] += f[Object.keys(f)]
        })
        res.data.timelinesDeath[i].data.forEach((f, index) => {
          deathSum[index] += f[Object.keys(f)]
        })
      }
     

      this.setState({
        timelines: { labels: dates, timelinesDeath: deathSum,
           timelinesConfirmed: confirmedSum,
           timelinesRecovered: recoveredSum}
      })
    }).catch(e => console.log(e));
  }

  render() {
    return (<div>
      <div className="w-90 center ba bw1 b shadow-3 br3 bg-white f5 blue mt3">
      <Link to="/guide" className="flex justify-center">
        <InfoIcon className="mv2 mh2"/>
        <div className="mv2">What do I need to know?</div>
      </Link>

      </div>
      <Overall placeName={"World"} place={this.state.world} timelines={this.state.timelines}/>
      <Table1 stats={this.state.liveStats} />
      </div>
    );
  }
}

export default Home;
