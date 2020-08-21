import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Btn } from '../Btn/Btn'
import "./LinkBtn.css"


export class LinkBtn extends Component {

  render() {
    return (
      this.props.external ?
      <a href={this.props.link} target="_blank">
        <Btn colour={this.props.colour} icon={this.props.icon} className={this.props.className}>{this.props.children}</Btn>
      </a>
      :
      <Link to={this.props.link}>
        <Btn colour={this.props.colour} icon={this.props.icon} className={this.props.className}>{this.props.children}</Btn>
      </Link>
    )

  }


}

export default LinkBtn;
