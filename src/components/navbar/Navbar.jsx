import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import "./Navbar.css"


export class Navbar extends Component {

  render() {

    return (      
          <AppBar position="static" className="appbar">
              <Toolbar>
              <h1 className="f3 tc pv3 b ma0">
                COVID-19 (Coronavirus)
              </h1>
              </Toolbar>
            </AppBar>  
    );
  }
}

export default Navbar;
