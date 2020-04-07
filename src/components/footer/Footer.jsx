import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import './Footer.css';
import { Link } from 'react-router-dom';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    
    render() {
        return (
            <BottomNavigation
            className="botNav"
            value={this.state.value}
            onChange={(e, newValue) => {
              this.setState({ value: newValue });
            }}
            showLabels
          >
            <BottomNavigationAction label="Created by the COVID-19 Trackers" disableRipple disableTouchRipple disabled/>
            <BottomNavigationAction component={Link} to="/" value='home' label="Home" icon={<HomeIcon />}/>
            <BottomNavigationAction component={Link} to="/sources" value='sources' label="Sources" icon={<BookIcon />}/>
          </BottomNavigation>
        );
    }
}

export default Footer;
