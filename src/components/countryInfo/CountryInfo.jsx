import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { newsXML } from './newsXML'
import { NewsBlock } from './newsBlock/NewsBlock'
import { v4 as uuidv4 } from 'uuid';
import { Overall, Table1 } from '..'
import axios from 'axios';
import moment from "moment";
import { CircularProgress } from '@material-ui/core';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import "./CountryInfo.css"
import { useHistory, Redirect } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
const Parser = require('rss-parser');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.REACT_APP_NEWS_API_KEY);

class CountryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.match.params.country,
      countryStats: {},
      news: [],
      graph: null
    }
  }

  toTitleCase(str) {
    const lowerStr = str.toLowerCase();
    if (str === "usa" || str == "uae" || str == "uk") return str.toUpperCase();
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  getLiveStats(country) {
    return axios.get(`/live-stats/${country.toLowerCase()}`);
  }

  getParsedNews(url) {
    let parser = new Parser();
    return parser.parseURL(`https://cors-anywhere.herokuapp.com/${url}`)
  }

  getTimeMeasure(diffInMilli) {
    const diff = moment.duration(moment().diff(diffInMilli), "milliseconds");
    if (diff >= 1000 * 60 * 60 * 24) return Math.floor(diff.asDays()) + " day(s) ago";
    if (diff >= 1000 * 60 * 60) return Math.floor(diff.asHours()) + " hr(s) ago";
    return Math.floor(diff.asMinutes()) + " min(s) ago";
  }

  componentDidMount() {

    let query = this.state.country + " coronavirus";
    let url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&maxitems=4`
    this.getLiveStats(this.state.country).then(res => {
      this.setState({ countryStats: res.data.countryStats });
    })

    newsapi.v2.everything({
      q: `${query}`,
      language: 'en',
      sortBy: 'publishedAt',
      }).then(response => {
        let news = response.articles.map((r) => {
          return {

            link: r.url,
            pubDate: moment(r.publishedAt, 'YYYY-MM-DDTHH:mm:ssZ').valueOf(),
            publisher: r.source.name ? r.source.name : 'External',
            title: r.title
          }
        });
        news = news.sort((a,b) => a.pubDate < b.pubDate ? 1 : -1)
        news = news.map((r) => {
          return { link: r.link, pubDate: this.getTimeMeasure(r.pubDate), publisher: r.publisher, title: r.title }
        })
        this.setState({ news: news });
       }).catch((e) => console.log(e))

  }

  render() {
    if (!this.state.countryStats) {
      return (<Redirect to={{
        pathname: '/404',
        state: { path: this.state.country }
      }} />);
    }
    const newsAggregation = this.state.news.splice(0, 20).map((item) => {
      return <NewsBlock key={uuidv4()} item={item}/>
    })

    return (
      <div>
    <div className="w-70-ns w-90 mt-0 mb-0 mr-auto ml-auto">
      
        <Link to="/" className="ba bg-white  b f3 blue mt3 custom">
            <HomeIcon/>
            <div>Home</div>
          </Link>   
        
        </div>

      <div className="flex mt2"> 
        <Overall placeName={this.state.country} place={this.state.countryStats} />
      </div>

        <div className="tc pt4 mb2 mh2 br2">
          <p className="f3 gray b mt2 mb0 pa0" >
              Top Stories in {this.toTitleCase(this.state.country)}
          </p>
          <div className="flex">
          <div className="center flex">
            <p className="ma0"> Live </p>
            <div><RadioButtonCheckedIcon className="liveBtn"/> </div>
          </div>
          </div>
        </div>

          <div className="tc ">

              <div className="f3">
                {newsAggregation.length == 0 ? <CircularProgress /> : newsAggregation}
              </div>
          </div>

      </div>
    );
  }
}

export default CountryInfo;
