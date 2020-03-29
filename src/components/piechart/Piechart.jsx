import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


class Piechart extends Component {
    
    render() {
        return (
            <Doughnut
            data={this.props.data}
            options={{
		animation: { duration: 0 },
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
