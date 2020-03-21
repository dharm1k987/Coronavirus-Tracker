import React from 'react';
import { Overall, Table1 } from '..'
import axios from 'axios';


class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      liveStats: null,
      world: null,
      timelines: null
    }
  }

  componentDidMount() {
    axios
      .get('/live-stats')
      .then(res => {
        const world = res.data.stats.filter(s => s.country === "total:")[0];
        this.setState({
          liveStats: res.data.stats,
          world
        });
      });

    axios
    .get('/timelines')
    .then(res => {
      this.setState({
        timelines: res.data
      })
    }).catch(e => console.log(e));
  }

  render() {
    return (<div>
        {
          this.state.world && this.state.liveStats && this.state.timelines ? 
          <div>
            <Overall placeName={"World"} place={this.state.world} timelines={this.state.timelines}/>
            <Table1 stats={this.state.liveStats} />
          </div>
        : null
        }

      </div>
    );
  }
}

export default Home;
