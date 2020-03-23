import React from 'react';


function TipCard(props) {
  return (
    <div>
      <div className="ba b--silver br3 shadow-5 ph3 pv4 mv4 bg-white">
          <div className="flex mt2 mb3 justify-center">
            {props.titleIcon}
            <div className="ph2 b f4">{props.title}</div>
          </div>
          <ul>
            {props.points ? props.points.map(p => <li className="pv2">{p}</li>) : []}
          </ul>
        </div>
    </div>
  );
}

export default TipCard;

