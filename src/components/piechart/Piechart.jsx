import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


class Piechart extends Component {
    
    render() {
        return (
            <Doughnut
            data={this.props.data}
            options={{
                legend:{
                display:true,
                labels: {
                    padding: 4,
                    boxWidth: 10,
                },
                }
            }}
            className=""
        />
        );
    }
}

export default Piechart;
