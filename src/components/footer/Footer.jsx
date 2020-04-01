import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import "./Footer.css"

class Footer extends Component {
    render() {
        return (
            <AppBar position="static" className="footer">
                <Toolbar>
                <div color="inherit" className="f6 lh-copy">
                Made by the COVID-19 Trackers
                </div>
                {/* <p className="tc f3 b mv2">
                Coronavirus Tracker
                </p> */}
                {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
          </AppBar>
        );
    }
}

export default Footer;
