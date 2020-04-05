import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';


class Piechart extends Component {
    
    render() {
        return (
            <div className="pv4">
                <h1 className="h6 tc">Coronavirus Piechart - Recovered, Active & Death Cases</h1>
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
            </div>
        );
    }
}

export default Piechart;
