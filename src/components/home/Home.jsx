import React from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';
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
      .get('/live-stats')
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
        {
          this.state.world && this.state.liveStats && this.state.timelines ? 
          <div>
            <Overall placeName={"World"} place={this.state.world} timelines={this.state.timelines}/>
            <Table1 stats={this.state.liveStats} />
          </div>
        : null
        }

      </div>
    );
  }
}

export default Home;
