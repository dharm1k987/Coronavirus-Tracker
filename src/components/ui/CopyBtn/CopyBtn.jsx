import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component';
import Btn from '../Btn/Btn';


export class CopyBtn extends Component {
  render() {
    let classes = `ba bw1 b br3 f5 w-100 mv3
    ${this.props.isDisabled ? '' : 'shadow-4'}
    bg-${this.props.isDisabled ? 'light-silver' : 'white'}
    ${this.props.isDisabled ? 'white' : this.props.colour}
    b--${this.props.isDisabled ? 'white' : this.props.colour}
    ${this.props.className}`;
    return (
      <CopyToClipboard
        text={this.props.textToCopy}
        onCopy={this.props.onCopy}
        >
      <button
      disabled={this.props.isDisabled}
      onClick={(e) => { if (this.props.handleOnClick) this.props.handleOnClick()} }
        className={classes}>
          <div className="flex justify-center">
            <div className="mh2 mv2">{this.props.icon}</div>
            <p className="ma0 mv2">{this.props.children}</p>
          </div>
      </button>
      </CopyToClipboard>
    );
  }

}

export default CopyBtn;
