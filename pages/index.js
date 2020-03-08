import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core/';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Link from 'next/link';

import { Navbar } from './components/Navbar';
import { Overall } from './components/Overall';
import Table1 from './components/Table1';
import fetch from 'isomorphic-unfetch';


const Index = (props) => {
  return (
    <div>
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
      <div className="apply-font mid-gray">
        <Navbar />
        <div className="flex mv3">
          <div className="center flex">
            <p className="ma0"> Live </p>
            <div><RadioButtonCheckedIcon className="liveBtn"/> </div>
          </div>
        </div>
        <Overall world={props.world}/>
      </div>
    </div>
  );
}

Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:9000/live-stats');
  const { stats } = await res.json();
  return {
    liveStats: stats,
    world: {
      totalDeaths: stats[stats.length - 1].totalDeaths,
      activeCases: stats[stats.length - 1].activeCases,
      totalRecovered: stats[stats.length - 1].totalRecovered,
    }
  };
}

export default Index;
