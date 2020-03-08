import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core/styles";
import "./Navbar.css"


export class Navbar extends Component {

  render() {

    return (
        
        <div>
          <div>
          <AppBar position="static" className="appbar">
              <Toolbar>
              <Typography variant="h6" color="inherit" className="title">
                Coronavirus Tracker
              </Typography>
              {/* <p className="tc f3 b mv2">
              Coronavirus Tracker
              </p> */}
                {/* <Button color="inherit">Login</Button> */}
              </Toolbar>
            </AppBar>

          </div>
        </div>
      
    );
  }
}

export default Navbar;
