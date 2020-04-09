import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import "./Timeline.css"
import Checkbox from '@material-ui/core/Checkbox';
import TCCard from '../ui/TCCard/TCCard';


class Timeline extends Component {

    render() {
        return (
                <TCCard>
                    <h1 className="h6 tc mid-gray">Coronavirus Line Graph<br></br> Recovered, Active & Death Cases | Log 
                        <span>
                            <Checkbox className="checkbox-mui" onChange={this.props.click}></Checkbox>
                        </span>
                    </h1>
                    <Line ref="chart" data={this.props.data} options={this.props.options}/>
                </TCCard>
        );
    }
}

export default Timeline;
