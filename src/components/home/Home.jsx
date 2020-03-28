import React from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

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
        const world = res.data.stats.filter(s => s.country === "TOTAL:")[0];
        this.setState({
          liveStats: res.data.stats,
          world
        });
      });

    axios
    .get(`${process.env.REACT_APP_API_URL}/timelines/`)
    .then(res => {
      let dates = res.data.timelinesConfirmed[0].data.map(a => a.date);
      dates = dates.map(slashDate => moment(slashDate, 'MM/DD/YYYY').format('MMM D'))
      let confirmedSum = dates.map(() => 0)
      let recoveredSum = dates.map(() => 0)
      let deathSum = dates.map(() => 0)

      let numRecords = res.data.timelinesConfirmed.length;

      for (let i = 0; i < numRecords; i++) {
        res.data.timelinesConfirmed[i].data.forEach((f, index) => {
          confirmedSum[index] += f.value
        })
        res.data.timelinesRecovered[i].data.forEach((f, index) => {
          recoveredSum[index] += f.value
        })
        res.data.timelinesDeath[i].data.forEach((f, index) => {
          deathSum[index] += f.value
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
      <div className="w-70-ns w-90 center ba bw1 b shadow-4 br3 bg-white f5 blue mt3">
      <Link to="/guide" className="flex justify-center">
        <InfoIcon className="mv2 mh2"/>
        <div className="mv2">What do I need to know?</div>
      </Link>
      </div>
      <div className="w-70-ns w-90 center ba bw1 b shadow-4 br3 bg-white b--light-red f5 mt3">
      <Link to="/readiness-test" className="hover-red flex justify-center white b--light-red br3 light-red">
        <VerifiedUserIcon className="mv2 mh2"/>
        <div className="mv2">COVID-19 Pandemic Readiness Test</div>
      </Link>
      </div>
      <Overall placeName={"World"} place={this.state.world} timelines={this.state.timelines}/>
	     <input type="hidden" name="IL_IN_ARTICLE" />

      <Table1 stats={this.state.liveStats} />

	   <input type="hidden" name="IL_IN_ARTICLE" />

      </div>
    );
  }
}

export default Home;
