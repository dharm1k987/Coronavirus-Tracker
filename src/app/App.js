import React from 'react';
import './App.css';
import { Navbar, Footer } from '../components'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../components/home/Home';
import CountryInfo from '../components/countryInfo/CountryInfo';
import NoRouteMatch from '../components/NoRouteMatch/NoRouteMatch';
import { Guide } from '../components/guide/Guide';
import { Covid19ReadinessTest } from '../components/covid19-readiness-test/Covid19-readiness-test';
import { Sources } from '../components/sources/Sources';


class App extends React.Component {

  render() {
    return (
      <div className="apply-font mid-gray">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/readiness-test" component={Covid19ReadinessTest} />
          <Route exact path="/guide" component={Guide} />
          <Route exact path="/sources" component={Sources} />
          <Route exact path="/404" component={NoRouteMatch} />
          <Route exact path="/:country" component={CountryInfo} />
        </Switch>
        <Footer />
      </Router>
    </div>
    )
    }

}

export default App;
