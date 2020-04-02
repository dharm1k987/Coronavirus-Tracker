import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import "./Timeline.css"
import Checkbox from '@material-ui/core/Checkbox';


class Timeline extends Component {

    render() {
        return (
            <div className="ma3 w-70-ns w-90 ph3 pv1 center ba b--light-silver bg-white br4">
                <div className="logText">
                    <label className="h6 ph1">Log</label>
                    <Checkbox className="checkbox-mui" onChange={this.props.click}></Checkbox>
                </div>

                <Line ref="chart" data={this.props.data} options={this.props.options}/>
                
            </div>
        );
    }
}

export default Timeline;
