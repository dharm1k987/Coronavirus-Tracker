import React, { Component } from 'react';
import "./Overall.css"



export class Overall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeName: "",
            placeStats: {
                activeCases: 0,
                totalDeaths: 0,
                totalRecovered: 0,
            }
        }
    }
    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps);
        if (!prevState.placeName || (prevState.placeName && prevState.placeName === "")) {
            return { placeName: nextProps.placeName };
        }
        if (!prevState.place) {
            return { placeStats: nextProps.place };
        }
        else return null;
    }
        
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.placeName === "") {
            this.setState({ placeName: this.props.placeName });
        }
        if (!prevProps.place ||
            (!prevProps.place.activeCases && 
            !prevProps.place.totalDeaths && 
            !prevProps.place.totalRecovered)) {
            this.setState({ placeStats: this.props.place });
        }
    }

    render() {
        return (
            <div className="shadow-1 br2 ma3 w-90 center">
                <div className="tc pt4 mb3 mh2 br2">
                    <p className="f1 b mt2 mb0 pa0" >
                        {this.state.placeName}
                    </p>
                    <div className="tc">
                        <p className="f2 b mb1">
                            {this.numberWithCommas(this.state.placeStats.activeCases)}
                        </p>
                        <p className="f5">
                            &nbsp; (active cases)
                        </p>
                    </div>
                </div>
                <div className="flex pb4">
                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pv4-ns pt3 br2">
                        <div className="b ma2">Deaths</div>
                        <div className="light-red">{this.numberWithCommas(this.state.placeStats.totalDeaths)}</div>
                    </div>

                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pv4-ns pt3 br2">
                        <div className="b ma2">Recovered</div>
                        <div className="green">{this.numberWithCommas(this.state.placeStats.totalRecovered)}</div>
                    </div>
                </div>
            </div>
          );
    }
}

export default Overall;
