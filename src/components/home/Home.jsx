import React from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';
import InfoIcon from '@material-ui/icons/Info';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { LinkBtn } from '../ui/LinkBtn/LinkBtn'
import "./Home.css"
import TCCard from '../ui/TCCard/TCCard';
import Btn from '../ui/Btn/Btn';
import SiteIntro from '../SiteIntro/SiteIntro';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopyBtn from '../ui/CopyBtn/CopyBtn';

const moment = require('moment')


class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      liveStats: null,
      world: null,
      timelines: null,
      copyBtnIsDisabled: false
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

  siteLinkCopied() {
    // TODO: copy link
    this.setState({
      copyBtnIsDisabled: true
    })
  }

  render() {
    return (<div>
      <h1 className="f2 f1-ns tc w-50-ns w-90 center mt4 mt5-ns mb3 normal">Welcome to <b>TRCO.CC</b></h1>
      <h1 className="f5 f4-ns tc w-50-ns w-90 center mv3 normal">Find the latest on the COVID-19 outbreak here.</h1>
      <div className="w-50-ns w-90 center mv3">
        <CopyBtn
          textToCopy={"trco.cc"}
          onCopy={() => this.siteLinkCopied()}
          isDisabled={this.state.copyBtnIsDisabled}
          colour="blue" icon={<FilterNoneIcon />}
        >{this.state.copyBtnIsDisabled ? 'Copied TRCO.CC!' : 'Copy TRCO.CC & share with family' }</CopyBtn>
      </div>
      <Overall placeName={"World"} place={this.state.world} timelines={this.state.timelines}/>
      <div className="w-50-ns w-90 center">
      <LinkBtn colour="light-red" icon={<VerifiedUserIcon />} link="/readiness-test">COVID-19 Pandemic Readiness Test</LinkBtn>
      </div>
      <div className="w-50-ns w-90 center">
        <LinkBtn colour="blue" icon={<InfoIcon />} link="/guide">What do I need to know?</LinkBtn>
      </div>
      <Table1 stats={this.state.liveStats} />
      <div className="mt3 w-60-ns w-90 tc center">
        <SiteIntro />
      </div>
      </div>
    );
  }
}

export default Home;
