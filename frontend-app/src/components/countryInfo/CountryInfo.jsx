import React from 'react';
import { NewsBlock } from './newsBlock/NewsBlock'
import { v4 as uuidv4 } from 'uuid';
import { Overall } from '..'
import axios from 'axios';
import moment from "moment";
import { CircularProgress } from '@material-ui/core';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import "./CountryInfo.css"
import HomeBtn from '../HomeBtn/HomeBtn';
import { Redirect } from 'react-router-dom';
import CopyBtn from '../ui/CopyBtn/CopyBtn';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { Table2 } from '../table2/Table2';
const Parser = require('rss-parser');

class CountryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.match.params.country,
      countryStats: null,
      news: [],
      graph: null,
      notFound: false,
      timelines: null,
      stateStats: [],
      copyBtnIsDisabled: false
    }
  }

  getLiveStats(country) {
    return axios.get(`${process.env.REACT_APP_API_URL}/live-stats/${country.toUpperCase()}`);
  }

  getParsedNews(url) {
    return axios.get(`cors/${url}`)
      .then(res => new Parser().parseString(res.data))
      .catch(err => console.log(err))
  }

  getTimeMeasure(diffInMilli) {
    const diff = moment.duration(diffInMilli, 'milliseconds');
    if (diff >= 1000 * 60 * 60 * 24) return Math.floor(diff.asDays()) + " day(s) ago";
    if (diff >= 1000 * 60 * 60) return Math.floor(diff.asHours()) + " hr(s) ago";
    return Math.floor(diff.asMinutes()) + " min(s) ago";
  }

  timeSincePosted(postTime) {
    return moment().diff(moment(postTime));
  }


  componentDidMount() {
    let query = this.state.country.toLowerCase() + " coronavirus";
    let url = `news.google.com/rss/search?q=${encodeURIComponent(query)}&maxitems=4`
    this.getLiveStats(this.state.country).then(res => {
      if (!res.data.countryStats) this.setState({ notFound: true })
      else this.setState({ countryStats: res.data.countryStats });
    }).catch(e => {
      console.log(e);
      this.setState({
        notFound: true
      })
    })

    this.getParsedNews(url)
      .then(res => {
        if (!res) return;
        const news = res.items
          .filter(i => !i.title.toLowerCase().includes("live update"))
          .sort((i, j) => this.timeSincePosted(i.pubDate) < this.timeSincePosted(j.pubDate) ? -1 : 1)
          .map(i => {
            let splitTitle = i.title.split('-');
            let publisher = splitTitle[splitTitle.length - 1];
            splitTitle.splice(splitTitle.length - 1, 1);
            return {
              ...i,
              pubDate: this.getTimeMeasure(this.timeSincePosted(i.pubDate)),
              title: splitTitle.join('-'),
              publisher
            };
          });
        this.setState({ news });
      }).catch(e => console.log(e));

    axios
      .get(`${process.env.REACT_APP_API_URL}/timelines/${this.state.country.toUpperCase()}`)
      .then(res => {
        let dates = res.data.countryTimelines.timelinesConfirmed[0].data.map(a => a.date);
        dates = dates.map(slashDate => moment(slashDate, 'MM/DD/YYYY').format('MMM D'))

        let confirmedSum = res.data.countryTimelines.timelinesConfirmed[0].data.map(f => f.value)
        let recoveredSum = res.data.countryTimelines.timelinesRecovered[0].data.map(f => f.value)
        let deathSum = res.data.countryTimelines.timelinesDeath[0].data.map(f => f.value)

        this.setState({
          timelines: {
            labels: dates, timelinesDeath: deathSum,
            timelinesConfirmed: confirmedSum,
            timelinesRecovered: recoveredSum
          }
        })


      }).catch(e => console.log(e))

    axios
      .get(`${process.env.REACT_APP_API_URL}/live-stats/${this.state.country.toUpperCase()}/states`)
      .then(res => {
        this.setState({ stateStats: res.data.stateStats })
      }).catch(e => console.log(e))


  }

  render() {
      
    if (this.state.notFound) {
      return (<Redirect to={{
        pathname: '/404',
        state: { path: this.state.country }
      }} />);
    }
    const newsAggregation = this.state.news.splice(0, 20).map((item) => {
      return <NewsBlock key={uuidv4()} item={item} />
    })

    return (
      <div>
        <div className="w-50-ns w-90 center"><HomeBtn /></div>
        <div className="w-50-ns w-90 center mv1">
          <CopyBtn
            textToCopy={encodeURI("trco.cc/"+this.state.country)}
            onCopy={() => this.setState({ copyBtnIsDisabled: true })}
            isDisabled={this.state.copyBtnIsDisabled}
            colour="blue" icon={<FilterNoneIcon />}
          >{this.state.copyBtnIsDisabled ? `Copied TRCO.CC/${this.state.country}!` : `Copy TRCO.CC/${this.state.country}` }</CopyBtn>
        </div>

        <div>
          {
              this.state.countryStats && this.state.country ? <Overall placeName={this.state.country.toUpperCase()} place={this.state.countryStats}
                timelines={this.state.timelines ? this.state.timelines : null} />
                : null
          }
        </div> 

        {/* Add table for CAD, CHN, USA */}
        {
          this.state.stateStats.length > 0 ? <Table2 stats={this.state.stateStats}/> : null 
        }

        <div className="tc mt4 mb2 mh2 br2">
          <h1 className="f3 mid-gray b mt2 mb0 pa0" >
            Top Stories in {this.state.country.toUpperCase()}
          </h1>
          <div className="flex">
            <div className="center flex">
              <p className="ma0"> Live </p>
              <div><RadioButtonCheckedIcon className="liveBtn" /> </div>
            </div>
          </div>
        </div>

        <div className="tc ">
          <div className="f3">
            {newsAggregation.length === 0 ? <CircularProgress /> : newsAggregation}
          </div>
        </div>

      </div>
    );
  }
}

export default CountryInfo;
