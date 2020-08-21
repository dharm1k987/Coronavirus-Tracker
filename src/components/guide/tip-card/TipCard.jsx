import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TCCard from '../../ui/TCCard/TCCard';



function TipCard(props) {
  return (
    <div className="mv4">
      <TCCard>
          <div className="flex mt2 mb3 items-center-l justify-center">
          <div style={props.style}>
            {props.titleIcon}
          </div>
            <div className="ph2 b f4">{props.title}</div>
          </div>
          <ul>
            {props.points ? props.points.map(p => <li className="mv2"  key={uuidv4()}>{p}</li>) : []}
          </ul>
      </TCCard>
    </div>
  );
}

export default TipCard;

