import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import TCCard from '../ui/TCCard/TCCard';


class Piechart extends Component {
    
    render() {
        return (
                <TCCard>
                    <h1 className="h6 tc mid-gray">Coronavirus Piechart<br></br> Recovered, Active & Death Cases</h1>
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
                    />
                </TCCard>
        );
    }
}

export default Piechart;
