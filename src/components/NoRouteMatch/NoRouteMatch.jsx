import React from 'react';
import HomeBtn from '../HomeBtn/HomeBtn';


class NoRouteMatch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      path: props.path,
      countryStats: {},
      news: []
    }
  }

  render() {

    return (
      <div className="w-70-ns w-90 center">
        <p className="ph3 f1-ns f3 tc mt6">ERROR 404: Sorry, /{this.props.location.state.path} didn't match a path</p>
        <div className="mt3"><HomeBtn /></div>
      </div>
    );
  }
}

export default NoRouteMatch;
