import React from 'react';
import './App.css';
import { Navbar } from '../components'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from '../components/home/Home';
import CountryInfo from '../components/countryInfo/CountryInfo';
import NoRouteMatch from '../components/NoRouteMatch/NoRouteMatch';
import { Guide } from '../components/guide/Guide';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="apply-font mid-gray">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/guide" component={Guide} />
          <Route exact path="/404" component={NoRouteMatch} />
          <Route exact path="/:country" component={CountryInfo} />
        </Switch>
      </Router>
    </div>
    )
    }

}

export default App;
