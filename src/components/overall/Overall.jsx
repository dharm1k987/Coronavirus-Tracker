import React, { Component } from 'react';
import "./Overall.css"
import { CircularProgress } from '@material-ui/core';
import { Doughnut, Line } from 'react-chartjs-2';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
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
            timelineData: null
        }
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

    convertDate

    componentDidMount() {
        console.log(this.state.placeTimeline)
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
        // let labels = [];
        // let data1 = [];
        // let data2 = [];
        // let data3 = [];

        // this.state.placeTimeline.timelinesDeath[0].data.forEach(day => {
        //     let slashDate = Object.keys(day)[0];
        //     let date = moment(slashDate, 'MM/DD/YYYY').format('MMM D')
        //     labels.push(date);
        //     data1.push(day[slashDate])
        // })
        // console.log(this.state.placeTimeline.timelinesRecovered[0]);
        // this.state.placeTimeline.timelinesRecovered[0].data.forEach(day => {
        //     let slashDate = Object.keys(day)[0];
        //     data2.push(day[slashDate])
        // })
        // this.state.placeTimeline.timelinesConfirmed[0].data.forEach(day => {
        //     let slashDate = Object.keys(day)[0];
        //     data3.push(day[slashDate])
        // })

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

        // const data = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [
        //       {
        //         label: 'My First dataset',
        //         fill: false,
        //         lineTension: 0.01,
        //         borderColor: 'rgba(75,192,192,1)',
        //         data: [65, 59, 80, 81, 56, 55, 40]
        //       },
        //       {
        //         label: 'My second dataset',
        //         fill: false,
        //         lineTension: 0.01,
        //         borderColor: 'rgba(75,255,255,1)',
        //         data: [65, 39, 23, 11, 56, 55, 40]
        //       }
        //     ]
        //   };
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
                {
                    this.state.timelineData ? <Line ref="chart" data={this.state.timelineData} options={this.options()}/> : null
                }
                {/* <Line ref="chart" data={data} /> */}

                <div className="tc pt4 mb3 mh2 br2">
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
                <div className="dn-l db center f2-ns f3 b pa2 tc mh2 pv4-ns pt3 br2">
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
                </div>
                <div className="flex pb4">
                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pv4-ns pt3 br2">
                        <div className="b ma2 mid-gray">Deaths</div>
                        <div className="light-red">{this.numberWithCommas(this.state.place.totalDeaths)}</div>

                    </div>

                    <div className="db-l dn f2-ns f3 b fl w-33 pa2 tc mh2 pv4-ns pt3 br2">
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
                    </div>

                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pv4-ns pt3 br2">
                        <div className="b ma2 mid-gray">Recovered</div>
                        <div className="green">{this.numberWithCommas(this.state.place.totalRecovered)}</div>
                    </div>
                </div>
            </div>
          );
    }
}

export default Overall;
