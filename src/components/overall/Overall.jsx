import React, { Component } from 'react';
import "./Overall.css"



export class Overall extends Component {

    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <div className="shadow-1 br2 ma3">
                <div className="tc pt4 mb3 mh2 br2">
                    <p className="f1 b mt2 mb0 pa0" >
                        WORLD
                    </p>
                    <p className="f2 b">
                        {this.numberWithCommas(this.props.world.activeCases)}
                    </p>
                </div>
                <div className="flex pb4">
                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pv4-ns pt3 br2">
                        <div className="b ma2">Deaths</div>
                        <div className="light-red">{this.numberWithCommas(this.props.world.totalDeaths)}</div>
                    </div>

                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pv4-ns pt3 br2">
                        <div className="b ma2">Active</div>
                        <div className="green">{this.numberWithCommas(this.props.world.activeCases)}</div>
                    </div>


                    <div className="f2-ns f3 b fl w-50 pa2 tc mh2 pv4-ns pt3 br2">
                        <div className="b ma2">Recovered</div>
                        <div className="green">{this.numberWithCommas(this.props.world.totalRecovered)}</div>
                    </div>
                </div>
            </div>
          );
    }
}

export default Overall;
