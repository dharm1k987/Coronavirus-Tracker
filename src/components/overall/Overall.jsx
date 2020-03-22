import React, { Component } from 'react';
import "./Overall.css"
import { CircularProgress } from '@material-ui/core';
import { Doughnut, Line } from 'react-chartjs-2';
import Timeline from '../timeline/Timeline'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Button from '@material-ui/core/Button';

const moment = require('moment');






export class Overall extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            placeName: props.placeName,
            place: props.place,
            graph: null,
            placeTimeline: props.timelines,
            timelineData: null,
            showLine: false,
            btnText: 'Show Graph'
        }

        this.getLineGraph = this.getLineGraph.bind(this)
    }
    
    numberWithCommas(x) {
        if (!x) return 0;
        if (x === '--') { return '--' }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    toTitleCase(str) {
        if (str === "usa" || str === "uae" || str === "uk") return str.toUpperCase();
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

    getLineGraph() {
        this.setState({
            showLine: !this.state.showLine,
            btnText: this.state.btnText == 'Show Graph' ? 'Hide Graph' : 'Show Graph'
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.timelines) {
            const skip = 5;
            this.setState({
                timelineData: {
                    labels: nextProps.timelines.labels.filter((_,i) => i % skip == 0),
                    datasets: [
                        {
                            label: 'Deaths',
                            fill: false,
                            lineTension: 0.1,
                            borderWidth: 1,
                            borderColor: '#ff725c',
                            pointStyle: 'rect',
                            pointBackgroundColor: '#ff725c',
                            data: nextProps.timelines.timelinesDeath.filter((_,i) => i % skip == 0) 
                        },
                        {
                            label: 'Recovered',
                            fill: false,
                            lineTension: 0.01,
                            borderWidth: 1,
                            borderColor: '#19a974',
                            pointStyle: 'rect',
                            pointBackgroundColor: '#19a974',
                            data: nextProps.timelines.timelinesRecovered.filter((_,i) => i % skip == 0) 
                        },
                        {
                            label: 'Confirmed',
                            fill: false,
                            lineTension: 0.01,
                            borderWidth: 1,
                            borderColor: '#ffb700',
                            pointStyle: 'rect',
                            pointBackgroundColor: '#ffb700',
                            data: nextProps.timelines.timelinesConfirmed.filter((_,i) => i % skip == 0) 
                        }
                    ]
                }
            })
        }


        
      }



    componentDidMount() {
        console.log(this.state.placeTimeline)

        if (this.state.placeTimeline) {
            const skip = 5;
            this.setState({
                timelineData: {
                    labels: this.state.placeTimeline.labels.filter((_,i) => i % skip == 0),
                    datasets: [
                        {
                            label: 'Deaths',
                            fill: false,
                            lineTension: 0.1,
                            borderWidth: 1,
                            borderColor: '#ff725c',
                            pointStyle: 'rect',
                            pointBackgroundColor: '#ff725c',
                            data: this.state.placeTimeline.timelinesDeath.filter((_,i) => i % skip == 0) 
                        },
                        {
                            label: 'Recovered',
                            fill: false,
                            lineTension: 0.01,
                            borderWidth: 1,
                            borderColor: '#19a974',
                            pointStyle: 'rect',
                            pointBackgroundColor: '#19a974',
                            data: this.state.placeTimeline.timelinesRecovered.filter((_,i) => i % skip == 0) 
                        },
                        {
                            label: 'Confirmed',
                            fill: false,
                            lineTension: 0.01,
                            borderWidth: 1,
                            borderColor: '#ffb700',
                            pointStyle: 'rect',
                            pointBackgroundColor: '#ffb700',
                            data: this.state.placeTimeline.timelinesConfirmed.filter((_,i) => i % skip == 0) 
                        }
                    ]
                }
            })
        }
        this.setState(prevState => ({
        graph: {
            labels: ['Active Cases','Deaths','Recoveries'],
            datasets: [
                {                    
                backgroundColor: [
                    '#ffb700',
                    '#ff725c',
                    '#19a974',
                ],
                data: [prevState.place.activeCases, prevState.place.totalDeaths, prevState.place.
                    totalRecovered]
                }
            ]
            }
        }))






    }

    options() {
        return (
            {
                scales: {
                   yAxes :[
                      {
                         ticks :{
                            maxTicksLimit:5
                         }
                      }
                   ]
                },
                legend: {
                    display: false,
                }
             }
        )
    }

    render() {
        return (
            <div className="ma3 w-70-ns w-90 center ba b--light-silver bg-white br4">
                <div className="center flex pa3 mid-gray">
                    <p className="ma0"> Live </p>
                    <div><RadioButtonCheckedIcon className="liveBtn"/> </div>
                </div>

                <div className="tc mb3 mh2 br2">
                    <p className="f1 b mt2 mb0 pa0 mid-gray" >
                        {this.toTitleCase(this.state.placeName)}
                    </p>
                    <div className="tc">
                        {this.state.place.totalCases === '--' ?
                            <CircularProgress /> :
                            <p className="f2 b mb1 gold">
                            { this.numberWithCommas(this.state.place.totalCases) }
                            </p>
                        }
                        <div className="f4 mid-gray b">
                            {
                                this.state.place.totalCases === '--' ? null :
                                <div>
                                    Active: {this.numberWithCommas(this.state.place.activeCases)}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="dn-l db center f2-ns f3 b pa2 tc mh2  pt3 br2">
                    { this.state.graph ?
                    <Doughnut
                        data={this.state.graph}
                        options={{
                            legend:{
                            display:false,
                            position:'right'
                            }
                        }}
                        className=""
                    /> : null }
                    {
                        this.state.timelineData ? <Button variant="contained" onClick={this.getLineGraph}>{this.state.btnText}</Button> 
                        : null
                    }
                </div>
                <div className="flex pb4">
                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pt3 br2">
                        <div className="b ma2 mid-gray">Deaths</div>
                        <div className="light-red">{this.numberWithCommas(this.state.place.totalDeaths)}</div>

                    </div>

                    <div className="db-l dn f2-ns f3 b fl w-33 pa2 tc mh2  pt3 br2">
                        { this.state.graph ?
                        <Doughnut
                            data={this.state.graph}
                            options={{
                                legend:{
                                display:false,
                                position:'right'
                                }
                            }}
                            className=""
                        /> : null }
                        {
                            this.state.timelineData ? <Button variant="contained" onClick={this.getLineGraph}>{this.state.btnText}</Button> 
                            : null
                        }

                    </div>

                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2  pt3 br2">
                        <div className="b ma2 mid-gray">Recovered</div>
                        <div className="green">{this.numberWithCommas(this.state.place.totalRecovered)}</div>
                    </div>
                </div>
                {this.state.timelineData && this.state.showLine? <Timeline data={this.state.timelineData} options={this.options()}/> : null }

            </div>
          );
    }
}

export default Overall;
