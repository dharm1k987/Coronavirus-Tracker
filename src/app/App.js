import React from 'react';
import './App.css';
import axios from 'axios';
import { Navbar, Overall, Table1 } from '../components'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      liveStats: {},
      world: {
        totalDeaths: "",
        activeCases: "",
        totalRecovered: "",
      }
    }
  }

  componentDidMount() {
    axios
      .get('/live-stats')
      .then(res => {
        const world = res.data.stats.filter(s => s.country === "Total:")[0];
        this.setState({
          liveStats: res.data.stats,
          world
        });
      });
  }

  render() {
    console.log(this.state.liveStats)
    return (
      <div className="apply-font mid-gray">
      <Navbar />
      <div className="flex mv3">
        <div className="center flex">
          <p className="ma0"> Live </p>
          <div><RadioButtonCheckedIcon className="liveBtn"/> </div>
        </div>
      </div>
      <Overall world={this.state.world}/>
      <Table1 data={this.state.liveStats}/>
    </div>
    )
  }


}

export default App;
