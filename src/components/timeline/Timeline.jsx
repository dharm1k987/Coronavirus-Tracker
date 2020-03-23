import React, { Component } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';


class Timeline extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }


    render() {
        return (
            <div className="ma3 w-70-ns w-90 pa3 center ba b--light-silver bg-white br4">
                <Line ref="chart" data={this.props.data} options={this.props.options}/>
            </div>
        );
    }
}

export default Timeline;
