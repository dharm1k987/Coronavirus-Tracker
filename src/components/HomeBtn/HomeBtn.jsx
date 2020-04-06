import React from 'react';
import { Link } from 'react-router-dom';
import ReplyIcon from '@material-ui/icons/Reply';


function HomeBtn(props) {
  return (
    <div>
      <div className="ba bw1 b shadow-4 br3 bg-white f5 blue mt3">
        <Link to="/" className="flex justify-center">
          <ReplyIcon className="mv2 mh2"/>
          <p className="ma0 pv2">Home</p>
        </Link>
      </div>
    </div>
  );
}

export default HomeBtn;

