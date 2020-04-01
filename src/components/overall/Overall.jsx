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
            flag: null
        }

        this.getLineGraph = this.getLineGraph.bind(this)
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
        const filteredArray = dataArray.filter((_,i) => i % skip === 0);
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
        let filteredProps = props.timelines.labels.filter((_,i) => i % skip === 0);
        return {
            labels: filteredProps.slice(Math.max(filteredProps.length - 10, 0)),
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
                data: [props.place.activeCases, props.place.totalDeaths, props.place.totalRecovered]
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
            if (placeToSearch === 'WORLD') return

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

    options() {
        return (
            {
                scales: {
                   yAxes :[
                      {
                         ticks :{
                            callback: function(value) {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                            maxTicksLimit:5,
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

                    <div className="flex items-center justify-center flex-wrap content-center mb3">                            
                        {this.state.flag ? <div className="w-10-ns w-20 mh2"><img className="ba" src={`${this.state.flag}`}/></div> : null }
                        <div className="f1-ns f2 b">{this.state.placeName}</div>                       

                    </div>

                    <div className="tc">
                        {!this.state.place ?
                            <CircularProgress /> :
                            <p className="f2 b mb1 gold">
                            { this.numberWithCommas(this.state.place.totalCases) }
                            </p>
                        }
                        <div className="f4 mid-gray b">
                            Active: {this.state.place ? this.numberWithCommas(this.state.place.activeCases) : 0 }

                        </div>
                    </div>
                </div>
                <div className="dn-l db center f2-ns f3 b pa2 tc mh2  pt3 br2">
                <CarouselProvider
                        lockOnWindowScroll={true}
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

                    <div className="dotDiv">
                        { this.state.graph ? <Dot slide={0} className="dotCust"> { this.state.timelineData ? <ArrowBackIcon/> : null }</Dot> : null }
                        { this.state.timelineData ? <Dot slide={1} className="dotCust"> <ArrowForwardIcon /> </Dot> : null }
                    </div>
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
                        lockOnWindowScroll={true}
                        naturalSlideWidth={200}
                        naturalSlideHeight={100}
                        infinite={true}
                        totalSlides={`${this.state.timelineData ? 2 : 1}`}
                    >

                    <Slider classNameAnimation="sliderAnimation">
                    <Slide index={0}>{ this.state.graph ? <Piechart data={this.state.graph} /> : null }</Slide>

                    {this.state.timelineData ? 
                    <Slide index={1}>{this.state.timelineData ? <Timeline data={this.state.timelineData} options={this.options()}/> : null }
                    </Slide> : null }
                    </Slider>

                    <div className="dotDiv">
                        { this.state.graph ? <Dot slide={0} className="dotCust"> { this.state.timelineData ? <ArrowBackIcon/> : null } </Dot> : null }
                        { this.state.timelineData ? <Dot slide={1} className="dotCust"> <ArrowForwardIcon /> </Dot> : null }
                    </div>

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
                <input type="hidden" name="IL_IN_TAG" value="1"/>

            </div>
          );
    }
}

export default Overall;
