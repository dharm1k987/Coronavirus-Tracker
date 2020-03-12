import React, { Component } from 'react';


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
      <div>
        <p className="ph3 f1-ns f3 tc pv6">ERROR 404: Sorry, /{this.props.location.state.path} didn't match a path</p>
      </div>
    );
  }
}

export default NoRouteMatch;
