import React from 'react';
import { Card } from '@material-ui/core';



function Btn(props) {
  return (
    <button onClick={(e) => props.handleOnClick()}
      className={`ba bw1 b shadow-4 br3 bg-white f5 w-100
      ${props.colour}
      b--${props.colour} mt3`}>
        <div className="flex justify-center">
          <div className="mh2 mv2">{props.icon}</div>
          <p className="ma0 mv2">{props.children}</p>
        </div>
    </button>
  );
}

export default Btn;
