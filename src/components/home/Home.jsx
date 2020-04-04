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

      <div className="w-70-ns w-90 center ba tc shadow-4 br3 mt3 flex flex-column pa1">
        <div className="mv2">
          <h1 className="f2 b">COVID-19 CORONAVIRUS UPDATE</h1> 
        </div>
        <div className="">
          <h2 className="f6 fw1 pa1">

            This site will serve as a <b>tracker</b> to the worldwide <b>COVID 19 Coronavirus pandemic</b>, that originated in <b>Wuhan, China</b>.
            <br></br><br></br>
            We offer <b>statistics</b> on the <b>latest virus outbreak</b>, and report figures of <b>total confirmed cases (infected), deaths and recoveries</b>.
            These numbers are accurate as per the <b>World Health Organization</b> and are <b>updated every few minutes</b>.
            <br></br><br></br>

            Clicking on a <b>country</b> will show a counter of the <b>current status</b> in that location. There will also be <b>world</b> news which you may
            refer to get the latest information.<br></br><br></br>

            Our goal is to provide <b>accurate information</b>, while at the same time keep it <b>succinct and relevant</b> instead of a full encyclopedia.

          </h2> 
        </div>
      </div>
      <Overall placeName={"World"} place={this.state.world} timelines={this.state.timelines}/>
	    	     <input type="hidden" name="IL_IN_ARTICLE" /> 

      <Table1 stats={this.state.liveStats} />

	    {/*  <input type="hidden" name="IL_IN_ARTICLE" /> */}

      </div>
    );
  }
}

export default Home;
