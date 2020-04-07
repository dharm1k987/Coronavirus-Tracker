import React, { Component } from 'react';
import "./Overall.css"
import Timeline from '../timeline/Timeline'
import Piechart from '../piechart/Piechart'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import axios from 'axios';

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
            labels: ['Recovered', 'Active Cases', 'Deaths',],
            datasets: [
                {
                    backgroundColor: [
                        '#19a974',
                        '#A463F2',
                        '#ff725c',
                    ],
                    data: [props.place.totalRecovered, props.place.activeCases, props.place.totalDeaths,]
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
                this.setState({ flag: '/earth.png' })
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
                <div className="ma3 w-50-ns w-70-m w-90 center ba b--light-silver bg-white br4 tc">
                    {/* Live Button */}
                    <div className="center flex ph3 pt3 mid-gray">
                        <p className="ma0"> Live </p>
                        <div><RadioButtonCheckedIcon className="liveBtn" /> </div>
                    </div>

                    {/* Country */}
                    <div className="flex mb2 justify-center items-center flex-wrap">
                        {this.state.flag ? <div className="w-10-ns w-20 mh2"><img className="mv3" alt={`${this.state.placeName} COVID-19`} src={`${this.state.flag}`} /></div> : null}
                        <div className="f1-ns f2 b">{this.state.placeName}</div>
                    </div>

                    <div className="flex justify-center justify-around-ns">
                        <div className="flex flex-column mb3">
                            {/* Total */}
                            <div className="f2-ns f4 b tc mh0-ns mh4 mb3">
                                <h1 className="b ma0 mid-gray f2-ns f4">Total</h1>

                                <div className="gold">{this.numberWithCommas(
                                    this.state.place ? this.state.place.totalCases : this.state.place
                                )}</div>
                            </div>

                            {/* Deaths */}
                            <div className="f2-ns f4 b fl tc mh0-ns mh4">
                                <h1 className="b ma0 mid-gray f2-ns f4">Deaths</h1>

                                {/* Flex column */}
                                {/* <div className="light-red"> {this.state.place ? this.numberWithCommas(this.state.place.totalDeaths) : 0} </div>
                                <div className="dark-red f6"> {this.state.place ? 
                                    this.state.place.newDeaths !== 0 ? <span>+ ({this.numberWithCommas(this.state.place.newDeaths)})</span>
                                    : null
                                : null}
                            </div> */}

                            {/* Flex row */}
                            <div className="light-red"> {this.state.place ? 
                                    <span className="flex items-center justify-center">{this.numberWithCommas(this.state.place.totalDeaths) }
                                     <span className="f7 f3-ns ml2 dark-red"> (+{this.numberWithCommas(this.state.place.newDeaths)})</span>
                                    </span>
                                : 0} </div>



                            </div>


                        </div>

                        {/* Deaths, Total, Recovered */}
                        <div className="flex flex-column mb3">
                            {/* Active */}
                            <div className="f2-ns f4 mid-gray b tc mh0-ns mh4 mb3">
                                <h1 className="b ma0 mid-gray f2-ns f4 ">Active</h1>
                                <div className="light-purple"> {this.state.place ? 
                                    <span className="flex items-center justify-center">{this.numberWithCommas(this.state.place.activeCases) }
                                     <span className="f7 f3-ns ml2 purple"> (+{this.numberWithCommas(this.state.place.newCases)})</span>
                                    </span>
                                : 0} </div>

                            </div>

                            {/* Recoveries */}
                            <div className="f2-ns f4 b fl tc mh0-ns mh4">
                                <h1 className="b ma0 mid-gray f2-ns f4 ">Recovered</h1>
                                <div className="green">{this.numberWithCommas(
                                    this.state.place ? this.state.place.totalRecovered : this.state.place
                                )}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-ns flex-column-m justify-center items-center">
                    {/* Line Graph */}
                    {this.state.timelineData ? 
                    <div className="mv3 w-30-ns w-50-m w-90 mh2-ns center ba b--light-silver bg-white br4">
                        <Timeline data={this.state.timelineData} options={this.options()} click={() => this.setState({ log: !this.state.log })} />
                    </div>
                    : null }

                    {/* Piechart */}
                    <div className="mv3 w-30-ns w-50-m w-90 mh2-ns center ba b--light-silver bg-white br4">
                        {this.state.graph ? <Piechart data={this.state.graph} options={this.piechartOptions()} /> : null}
                    </div>
                </div>

            </div>
        );
    }
}

export default Overall;
