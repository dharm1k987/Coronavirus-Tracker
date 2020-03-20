import React, { Component } from 'react';
import "./Overall.css"
import { CircularProgress } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';




export class Overall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeName: props.placeName,
            place: props.place,
            graph: null,
            placeTimeline: {}
        }
    }
    
    numberWithCommas(x) {
        if (!x) return 0;
        if (x == '--') { return '--' }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    toTitleCase(str) {
        const lowerStr = str.toLowerCase();
        if (str === "usa" || str == "uae" || str == "uk") return str.toUpperCase();
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }

    componentDidMount() {
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

    render() {
        return (
            <div className="ma3 w-70-ns w-90 center ba b--light-silver bg-white br4">
                <div className="center flex pa3 mid-gray">
                    <p className="ma0"> Live </p>
                    <div><RadioButtonCheckedIcon className="liveBtn"/> </div>
                </div>

                <div className="tc pt4 mb3 mh2 br2">
                    <p className="f1 b mt2 mb0 pa0 mid-gray" >
                        {this.toTitleCase(this.state.placeName)}
                    </p>
                    <div className="tc">
                        {this.state.place.totalCases == '--' ?
                            <CircularProgress /> :
                            <p className="f2 b mb1 gold">
                            { this.numberWithCommas(this.state.place.totalCases) }
                            </p>
                        }
                        <div className="f4 mid-gray b">
                            {
                                this.state.place.totalCases == '--' ? null :
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
