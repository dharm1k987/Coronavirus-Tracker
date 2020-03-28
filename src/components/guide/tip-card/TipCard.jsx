import React from 'react';
import { v4 as uuidv4 } from 'uuid';



function TipCard(props) {
  return (
    <div>
      <div className="ba b--silver br3 shadow-5 ph3 pv4 mv4 bg-white">
          <div className="flex mt2 mb3 items-center-l justify-center">
          <div style={props.style}>
            {props.titleIcon}
          </div>
            <div className="ph2 b f4">{props.title}</div>
          </div>
          <ul>
            {props.points ? props.points.map(p => <li className="pv2"  key={uuidv4()}>{p}</li>) : []}
          </ul>
        </div>
    </div>
  );
}

export default TipCard;

