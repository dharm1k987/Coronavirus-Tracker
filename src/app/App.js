import React from 'react';
import './App.css';
import { Navbar, Footer } from '../components'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../components/home/Home';
import CountryInfo from '../components/countryInfo/CountryInfo';
import NoRouteMatch from '../components/NoRouteMatch/NoRouteMatch';
import { Guide } from '../components/guide/Guide';
import { Covid19ReadinessTest } from '../components/covid19-readiness-test/Covid19-readiness-test';

class App extends React.Component {

  render() {
    return (
      <div className="apply-font mid-gray vh-100">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/readiness-test" component={Covid19ReadinessTest} />
          <Route exact path="/guide" component={Guide} />
          <Route exact path="/404" component={NoRouteMatch} />
          <Route exact path="/:country" component={CountryInfo} />
        </Switch>
      </Router>
      {/* TODO: <Footer /> */}
    </div>
    )
    }

}

export default App;
