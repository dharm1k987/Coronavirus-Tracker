import React from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';
import InfoIcon from '@material-ui/icons/Info';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { LinkBtn } from '../ui/LinkBtn/LinkBtn'
import "./Home.css"
import TCCard from '../ui/TCCard/TCCard';

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
    .get(`${process.env.REACT_APP_API_URL}/timelines/total`)
    .then(res => {
      let prefix = res.data.countryTimelines; // this can be change to remove countryTimelines if not querying country
      let dates = prefix.timelinesConfirmed[0].data.map(a => a.date);
      dates = dates.map(slashDate => moment(slashDate, 'MM/DD/YYYY').format('MMM D'))
      let confirmedSum = dates.map(() => 0)
      let recoveredSum = dates.map(() => 0)
      let deathSum = dates.map(() => 0)

      let numRecords = prefix.timelinesConfirmed.length;

      for (let i = 0; i < numRecords; i++) {
        prefix.timelinesConfirmed[i].data.forEach((f, index) => {
          confirmedSum[index] += f.value
        })
        prefix.timelinesRecovered[i].data.forEach((f, index) => {
          recoveredSum[index] += f.value
        })
        prefix.timelinesDeath[i].data.forEach((f, index) => {
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
      <div className="w-70-ns w-90 center">
        <LinkBtn colour="blue" icon={<InfoIcon />} link="/guide">What do I need to know?</LinkBtn>
      </div>


      <div className="w-70-ns w-90 center">
      <LinkBtn colour="light-red" icon={<VerifiedUserIcon />} link="/readiness-test">COVID-19 Pandemic Readiness Test</LinkBtn>

      </div>

     

      <div className="mt3 w-70-ns w-90 tc center">
        <TCCard>
          <h1 className="mid-gray">COVID-19 CORONAVIRUS UPDATE</h1> 
          <h2 className="mid-gray">

            This site will serve as a <b>tracker</b> to the worldwide <b>COVID 19 Coronavirus pandemic</b>, that originated in <b>Wuhan, China</b>.
            <br></br><br></br>
            We offer <b>statistics</b> on the <b>latest virus outbreak</b>, and report figures of <b>total confirmed cases (infected), deaths and recoveries</b>.
            These numbers are accurate as per the <b>World Health Organization</b> and are <b>updated every few minutes</b>.
            <br></br><br></br>

            Clicking on a <b>country</b> will show a counter of the <b>current status</b> in that location. There will also be <b>world</b> news which you may
            refer to get the latest information.<br></br><br></br>

            Our goal is to provide <b>accurate information</b>, while at the same time keep it <b>succinct and relevant</b> instead of a full encyclopedia.

          </h2> 
        </TCCard>
      </div>

      <Overall placeName={"World"} place={this.state.world} timelines={this.state.timelines}/>

        <Table1 stats={this.state.liveStats} />


      </div>
    );
  }
}

export default Home;
