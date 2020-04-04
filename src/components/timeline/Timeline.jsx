import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import "./Timeline.css"
import Checkbox from '@material-ui/core/Checkbox';


class Timeline extends Component {

    render() {
        return (
            <div className="pa4">
                <div className="flex justify-center mb3">
                    <label className="h6 ph1">Log</label>
                    <Checkbox className="checkbox-mui" onChange={this.props.click}></Checkbox>
                </div>

                <Line ref="chart" data={this.props.data} options={this.props.options}/>
                
            </div>
        );
    }
}

export default Timeline;
