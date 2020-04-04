import React, { Component } from 'react';
import "./Overall.css"
import { CircularProgress } from '@material-ui/core';
import Timeline from '../timeline/Timeline'
import Piechart from '../piechart/Piechart'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from 'axios';

import { CarouselProvider, Slider, Slide, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';




export class Overall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeName: props.placeName,
            place: null,
            graph: null,
            placeTimeline: props.timelines,
            timelineData: null,
            showLine: false,
            btnText: 'Show Graph',
            flag: null,
            log: false
        }

        this.getLineGraph = this.getLineGraph.bind(this)
        this.options = this.options.bind(this)
    }

    numberWithCommas(x) {
        if (!x) return 0;
        if (x === '--') { return '--' }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getLineGraph() {
        this.setState({
            showLine: !this.state.showLine,
            btnText: this.state.btnText === 'Show Graph' ? 'Hide Graph' : 'Show Graph'
        })
    }

    static customizeTimeline(label, colour, dataArray) {
        const skip = 5;
        const filteredArray = dataArray.filter((_, i) => i % skip === 0);
        return {
            label: label,
            fill: false,
            lineTension: 0.1,
            borderWidth: 1,
            borderColor: colour,
            pointStyle: 'rect',
            pointBackgroundColor: colour,
            data: filteredArray.slice(Math.max(filteredArray.length - 10, 0))
        }
    }

    static createTimelineData(props) {
        const skip = 5;
        let filteredProps = props.timelines.labels.filter((_, i) => i % skip === 0);
        return {
            labels: filteredProps.slice(Math.max(filteredProps.length - 10, 0)),
            datasets: [
                Overall.customizeTimeline('Recovered', '#19a974', props.timelines.timelinesRecovered),
                Overall.customizeTimeline('Total', '#ffb700', props.timelines.timelinesConfirmed),
                Overall.customizeTimeline('Deaths', '#ff725c', props.timelines.timelinesDeath),
            ]
        }
    }

    static createPiechart(props) {
        return {
            labels: ['Recovered', 'Active Cases', 'Deaths', ],
            datasets: [
                {
                    backgroundColor: [
                        '#19a974',
                        '#A463F2',
                        '#ff725c',
                    ],
                    data: [props.place.totalRecovered, props.place.activeCases, props.place.totalDeaths, ]
                }
            ]
        }
    }



    static getDerivedStateFromProps(props) {

        if (props.timelines && props.place) return { timelineData: Overall.createTimelineData(props), graph: Overall.createPiechart(props), place: props.place }
        if (!props.timelines && props.place) return { graph: Overall.createPiechart(props), place: props.place }

        return null;
    }

    componentDidMount(props) {
        // some conversions are nessesary
        let placeToSearch = this.state.placeName
        if (placeToSearch) {
            placeToSearch = placeToSearch.toUpperCase()
            if (placeToSearch === 'WORLD') {
                this.setState({ flag: '/earth.png'})
            }

            if (placeToSearch === 'SOUTH KOREA') placeToSearch = 'Korea (Republic of)'
            if (placeToSearch === 'NORTH MACEDONIA') placeToSearch = 'Macedonia'
            if (placeToSearch === 'FAEROE ISLANDS') placeToSearch = 'Faroe Islands'
            if (placeToSearch === 'CHANNEL ISLANDS') placeToSearch = 'Jersey'
            if (placeToSearch === 'VATICAN CITY') placeToSearch = 'Vatican'
            if (placeToSearch === 'BRITISH VIRGIN ISLANDS') placeToSearch = 'Virgin Islands'
            if (placeToSearch === 'ST. VINCENT GRENADINES') placeToSearch = 'Grenadines'

            axios.get(`https://restcountries.eu/rest/v2/name/${placeToSearch}`)
                .then(res => {
                    if (res.data.length > 0) {
                        // special case for Sudan and India, we should sort it because the actual flags are in reverse
                        if (placeToSearch === "INDIA" || placeToSearch === "SUDAN") res.data = res.data.reverse()
                        this.setState({ flag: res.data[0].flag })
                    }
                })
                .catch(e => console.log(e))
        }
    }

    piechartOptions() {
        return {
            legend: {
                display: true,
                labels: {
                    padding: 4,
                    boxWidth: 10,
                }
            }
        }
    }

    options() {
        let s = this.state;
        let result =
        {
            scales: {
                xAxes: [
                    {
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }
                ],
                yAxes: [
                    {
                        type: s.log ? 'logarithmic' : 'linear',
                        position: 'left',

                        ticks: {
                            callback: function (value, index, values) {
                                return ""; // value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //pass tick values as a string into Number function
                            },

                            maxTicksLimit: s.log ? 10 : 5,
                        },
                        afterBuildTicks: function (chartObj) {
                            if (!s.log) return

                            chartObj.max = 1000000
                            chartObj.min = 1
                            chartObj.ticks = [];
                            chartObj.ticks.push(1);
                            chartObj.ticks.push(10);
                            chartObj.ticks.push(100);
                            chartObj.ticks.push(1000);
                            chartObj.ticks.push(10000);
                            chartObj.ticks.push(100000);
                            chartObj.ticks.push(1000000);
                        },
                        gridLines: {
                            drawOnChartArea: false,
                            display: false
                        }
                    }
                ]
            },
            legend: {
                display: true,
                labels: {
                    padding: 4,
                    boxWidth: 10,
                }

            }
        }

        return result

    }

    render() {
        return (
            <div>
                <div className="ma3 w-50-ns w-90 center ba b--light-silver bg-white br4 tc">
                    {/* Live Button */}
                    <div className="center flex ph3 pt3 mid-gray">
                        <p className="ma0"> Live </p>
                        <div><RadioButtonCheckedIcon className="liveBtn" /> </div>
                    </div>

                    {/* Country */}
                    <div className="flex mb2 justify-center items-center flex-wrap">
                        {this.state.flag ? <div className="w-10-ns w-20 mh2"><img className="mv3" src={`${this.state.flag}`} /></div> : null}
                        <div className="f1-ns f2 b">{this.state.placeName}</div>
                    </div>

                    <div className="flex mb3 justify-around-ns justify-center">
                        {/* Total */}
                        <div className="f2-ns f4 b tc mh0-ns mh4">
                            <div className="b ma0 mid-gray">Total</div>
                            <div className="gold">{this.numberWithCommas(
                                this.state.place ? this.state.place.totalCases : this.state.place
                            )}</div>
                        </div>
                        {/* Active */}
                        <div className="f2-ns f4 mid-gray b tc mh0-ns mh4">
                            <div className="b ma0 mid-gray">Active</div>
                            <div className="light-purple"> {this.state.place ? this.numberWithCommas(this.state.place.activeCases) : 0} </div>
                        </div>
                    </div>

                    {/* Deaths, Total, Recovered */}
                    <div className="flex mb3 justify-around-ns justify-center">
                        {/* Deaths */}
                        <div className="f2-ns f4 b fl tc mh0-ns mh4">
                                    <div className="b ma0 mid-gray">Deaths</div>
                                    <div className="light-red">{this.numberWithCommas(
                                        this.state.place ? this.state.place.totalDeaths : this.state.place
                                    )}</div>
                        </div>

                        {/* Recoveries */}
                        <div className="f2-ns f4 b fl tc mh0-ns mh4">
                            <div className="b ma0 mid-gray">Recovered</div>
                            <div className="green">{this.numberWithCommas(
                                this.state.place ? this.state.place.totalRecovered : this.state.place
                            )}</div>
                        </div>
                    </div>
                    
                </div>

                {/* Line Graph */}
                <div className="flex flex-column ma3 w-50-ns w-90 center ba b--light-silver bg-white br4">

                    {this.state.timelineData ?
                                            <Timeline data={this.state.timelineData} options={this.options()} click={() => this.setState({ log: !this.state.log })} />
                                            : null}

                </div>

                {/* Piechart */}
                <div className="ma3 w-50-ns w-90 center ba b--light-silver bg-white br4 pv4">
                    
                    {this.state.graph ? <Piechart data={this.state.graph} options={this.piechartOptions()} /> : null}  

                </div>







                {/* Mobile Carousel */}
                {/* <div className="dn-l db center w-50-ns w-90  ba b--light-silver br4 tc">
                    <span className="h3">Graph</span>
                    <CarouselProvider
                        lockOnWindowScroll={true}
                        naturalSlideWidth={200}
                        naturalSlideHeight={117}
                        totalSlides={`${this.state.timelineData ? 2 : 1}`}
                        className="mt3"
                    >
                        <Slider>
                            <Slide index={0}>{this.state.graph ? <Piechart data={this.state.graph} /> : null}</Slide>
                            {this.state.timelineData ?
                                <Slide index={1}>{this.state.timelineData ?
                                    <Timeline data={this.state.timelineData} options={this.options()} click={() => this.setState({ log: !this.state.log })} />
                                    : null}
                                </Slide> : null}
                        </Slider>

                        <div className="dotDiv mb3">
                            {this.state.graph ? <Dot slide={0} className="dotCust"> {this.state.timelineData ? <ArrowBackIcon /> : null}</Dot> : null}
                            {this.state.timelineData ? <Dot slide={1} className="dotCust"> <ArrowForwardIcon /> </Dot> : null}
                        </div>
                    </CarouselProvider>
                </div> */}

                {/* Desktop + Mobile, but carousel for mobile is above*/}
                {/* Carousel for Desktop */}
                {/* <div className="db-l dn ma3 w-30-ns w-90 center ba b--light-silver bg-white br4 tc">
                    <span className="h3">Graph</span>
                    <CarouselProvider
                        lockOnWindowScroll={true}
                        naturalSlideWidth={200}
                        naturalSlideHeight={100}
                        infinite={true}
                        className="mt3"
                        totalSlides={`${this.state.timelineData ? 2 : 1}`}
                    >

                        <Slider classNameAnimation="sliderAnimation">
                            <Slide index={0}>{this.state.graph ? <Piechart data={this.state.graph} /> : null}</Slide>

                            {this.state.timelineData ?
                                <Slide index={1}>{this.state.timelineData ? <Timeline data={this.state.timelineData} options={this.options()} click={() => this.setState({ log: !this.state.log })} />
                                    : null}
                                </Slide> : null}
                        </Slider>

                        <div className="dotDiv mb3">
                            {this.state.graph ? <Dot slide={0} className="dotCust"> {this.state.timelineData ? <ArrowBackIcon /> : null} </Dot> : null}
                            {this.state.timelineData ? <Dot slide={1} className="dotCust"> <ArrowForwardIcon /> </Dot> : null}
                        </div>
                    </CarouselProvider>
                </div> */}

            </div>
        );
    }
}

export default Overall;
