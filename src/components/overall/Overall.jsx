import React, { Component } from 'react';
import "./Overall.css"
import { CircularProgress } from '@material-ui/core';
import Timeline from '../timeline/Timeline'
import Piechart from '../piechart/Piechart'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Button from '@material-ui/core/Button';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';




export class Overall extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            placeName: props.placeName,
            place: null,
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

    static customizeTimeline(label, colour, dataArray) {
        const skip = 5;
        return {
            label: label,
            fill: false,
            lineTension: 0.1,
            borderWidth: 1,
            borderColor: colour,
            pointStyle: 'rect',
            pointBackgroundColor: colour,
            data: dataArray.filter((_,i) => i % skip == 0) 
        }                                                         
    }

    static createTimelineData(props) {
        const skip = 5;
        return {
            labels: props.timelines.labels.filter((_,i) => i % skip == 0),
            datasets: [
                Overall.customizeTimeline('Deaths', '#ff725c', props.timelines.timelinesDeath),
                Overall.customizeTimeline('Recovered', '#19a974', props.timelines.timelinesRecovered),
                Overall.customizeTimeline('Confirmed', '#ffb700', props.timelines.timelinesConfirmed)
            ]
        }
    }

    static createPiechart(props) {
        return {
            labels: ['Active Cases','Deaths','Recoveries'],
            datasets: [
                {                    
                backgroundColor: [
                    '#ffb700',
                    '#ff725c',
                    '#19a974',
                ],
                data: [props.place.activeCases, props.place.totalDeaths, props.place.
                    totalRecovered]
                }
            ]
        }
    }



    static getDerivedStateFromProps(props, state) {
        console.log(props);
        console.log(state)
        if (props.timelines && props.place) return { timelineData: Overall.createTimelineData(props), graph: Overall.createPiechart(props), place: props.place }
        if (!props.timelines && props.place) return { graph: Overall.createPiechart(props), place: props.place }

        return null;
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
        console.log(this.state.place)
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
                        {!this.state.place ?
                            <CircularProgress /> :
                            <p className="f2 b mb1 gold">
                            { this.numberWithCommas(this.state.place.totalCases) }
                            </p>
                        }
                        <div className="f4 mid-gray b">
                            {
                                !this.state.place ? null :
                                <div>
                                    Active: {this.numberWithCommas(this.state.place.activeCases)}
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="dn-l db center f2-ns f3 b pa2 tc mh2  pt3 br2">
                <CarouselProvider
                        naturalSlideWidth={200}
                        naturalSlideHeight={125}
                        totalSlides={`${this.state.timelineData ? 2 : 1}`}
                    >
                    <Slider>
                    <Slide index={0}>{ this.state.graph ? <Piechart data={this.state.graph} /> : null }</Slide>
                    {this.state.timelineData ? 
                    <Slide index={1}>{this.state.timelineData ? <Timeline data={this.state.timelineData} options={this.options()}/> : null }
                    </Slide> : null }
                    </Slider>
                </CarouselProvider>
                    {/* { this.state.graph ? <Piechart data={this.state.graph} /> : null }
                    {
                        this.state.timelineData ? <Button variant="contained" className="showBtn" onClick={this.getLineGraph}>{this.state.btnText}</Button> 
                        : null
                    } */}
                </div>

                <div className="flex pb4">
                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pt3 br2">
                        <div className="b ma2 mid-gray">Deaths</div>
                        <div className="light-red">{this.numberWithCommas(
                            this.state.place ? this.state.place.totalDeaths : this.state.place 
                        )}</div>

                    </div>

                    <div className="db-l dn f2-ns f3 b fl w-70 tc mh2 br2">
                    <CarouselProvider
                        naturalSlideWidth={200}
                        naturalSlideHeight={125}
                        totalSlides={`${this.state.timelineData ? 2 : 1}`}
                    >
                    <Slider>
                    <Slide index={0}>{ this.state.graph ? <Piechart data={this.state.graph} /> : null }</Slide>
                    {this.state.timelineData ? 
                    <Slide index={1}>{this.state.timelineData ? <Timeline data={this.state.timelineData} options={this.options()}/> : null }
                    </Slide> : null }
                    </Slider>
                </CarouselProvider>
                        {/* { this.state.graph ? <Piechart data={this.state.graph} /> : null }
                        {
                            this.state.timelineData ? <Button variant="contained" onClick={this.getLineGraph}>{this.state.btnText}</Button> 
                            : null
                        }  */}

                    </div>

                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2  pt3 br2">
                        <div className="b ma2 mid-gray">Recovered</div>
                        <div className="green">{this.numberWithCommas(
                            this.state.place ? this.state.place.totalRecovered : this.state.place 
                        )}</div>                        
                    </div>
                </div>
                {this.state.timelineData && this.state.showLine? <Timeline data={this.state.timelineData} options={this.options()}/> : null }

            </div>
          );
    }
}

export default Overall;
