import React, { Component } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';


class Piechart extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <Doughnut
            data={this.props.data}
            options={{
                legend:{
                display:false,
                position:'right'
                }
            }}
            className=""
        />
        );
    }
}

export default Piechart;
