import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";
import "../../styles/main.css"
import "../../styles/Navbar.css"


export class Navbar extends Component {

  render() {
    const { classes } = this.props;

    return (
        
        <div>
          <div>
            {/* <IconButton edge="start"  color="inherit" aria-label="menu">
            <img src="https://avatars2.githubusercontent.com/u/61848106?s=200&v=4" alt="logo" className="logo"/>
            </IconButton> */}
            <p className="tc f3 b mv2">
              Coronavirus Tracker
            </p>
          </div>
        </div>
      
    );
  }
}

export default Navbar;
