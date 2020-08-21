import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import './TCCard.css'


export class TCCard extends Component {
  render() {
    let classes = `center ba b--light-silver pa3 custom-card mv3 ${this.props.className}`
    return (
      <Card className={classes}>
        {this.props.children}
      </Card>
    );
  }
}


export default TCCard;

