import React, { Component } from 'react';


export class Btn extends Component {
  

  nullOnClick = () => null
  render() {
    let classes = `ba bw1 b shadow-4 br3 bg-white f5 w-100 mv3 ${this.props.colour} b--${this.props.colour} ${this.props.className}`
    return (
      <button onClick={(e) => { this.props.handleOnClick ? this.props.handleOnClick() : this.nullOnClick()} }
        className={classes}>
          <div className="flex justify-center">
            <div className="mh2 mv2">{this.props.icon}</div>
            <p className="ma0 mv2">{this.props.children}</p>
          </div>
      </button>
    );
  }

}

export default Btn;
