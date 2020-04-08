import React from 'react';
import { Card } from '@material-ui/core';



function TCCard(props) {
  return (
    <Card className="center ba b--light-silver pa3">
      {props.children}
    </Card>
  );
}

export default TCCard;

