import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import PeopleIcon from '@material-ui/icons/People';
import PanToolIcon from '@material-ui/icons/PanTool';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import GradientIcon from '@material-ui/icons/Gradient';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { v4 as uuidv4 } from 'uuid';
import TipCard from './tip-card/TipCard';


export class Guide extends Component {

  constructor (props) {
    super(props);
    let tipList = [
      {
        title: "Stay Home",
        titleIcon: (<HomeIcon />),
        points: [
          "No public transportation, taxis or rideshares",
          "Avoid work, school or other public places"
        ],
        style: { color: '#8d6e63'}
      },
      {
        title: "Visitors",
        titleIcon: (<PeopleIcon />),
        points: [
          "Only have essential visitors and keep visits short",
          "Keep away from seniors and people with chronic medical conditions"
        ],
        style: { color: '#66bb6a'}

      },
      {
        title: "Avoid Contact",
        titleIcon: (<PanToolIcon />),
        points: [
          "Stay in a separate room away from other people in your home",
          "Rooms should have good airflow (e.g., open windows once in a while)"
        ],
        style: { color: '#ffca28'}

      },
      {
        title: "Keep Distance",
        titleIcon: (<TransferWithinAStationIcon />),
        points: [
          "In a room with other people, keep a distance of at least 2 meters",
          "Wear a mask that covers your nose and mouth",
          "If you cannot wear a mask, people should wear a mask when near you"
        ],
        style: { color: '#ab47bc'}

      },
      {
        title: "Coughs and Sneezes",
        titleIcon: (<RecordVoiceOverIcon />),
        points: [
          "Cover your mouth and nose with a tissue when you cough or sneeze",
          "Cough or sneeze into your upper sleeve or elbow, not your hand",
          "Throw used tissues in a lined wastebasket and wash your hands"
        ],
        style: { color: '#78909c'}

      },
      {
        title: "Wash your hands",
        titleIcon: (<InvertColorsIcon />),
        points: [
          "Wash your hands often with soap and water",
          "Dry your hands with a paper towel, or with your own cloth towel",
          "Use an alcohol-based hand sanitizers"
        ],
        style: { color: '#42a5f5'}

      },
      {
        title: "Consider masks when",
        titleIcon: (<CallToActionIcon />),
        points: [
          "You must leave your house to see a health care provider",
          "You are within two metres of other people"
        ],
        style: { color: '#bdbdbd'}

      },
      {
        title: "House cleaning",
        titleIcon: (<FormatColorFillIcon />),
        points: [
          "Clean all frequently touched areas",
          "Clean any surfaces than may have body fluids",
          "Wear disposable gloves when cleaning surfaces",
          "Use a diluted bleach solution or household disinfectant",
          "Eating utensils should be cleaned with dish soap and hot water"
        ],
        style: { color: '#ffca28'}

      },
      {
        title: "Laundry",
        titleIcon: (<GradientIcon />),
        points: [
          "Clothing and bedclothes can be cleaned using regular laundry soap",
          "Use disposable gloves when dealing with clothes with body fluids"
        ],
        style: { color: '#5c6bc0'}

      },
      {
        title: "Waste management",
        titleIcon: (<DeleteForeverIcon />),
        points: [
          "All waste generated can be bagged in a regular plastic bag and disposed of in regular household waste",
          "Wash your hands after handling waste"
        ],
        style: { color: '#9ccc65'}

      },

    ];
    this.state = {
      tipList
    };
  }

  render() {

    // ADVERT
    return (
      <div className="center w-90 w-70-ns">
        <Link to="/" className="ba bg-white  b f3 blue mt3 custom">
            <HomeIcon/>
            <div>Home</div>
          </Link> 
        <input type="hidden" name="IL_IN_ARTICLE" />

        {/* <div id="ezoic-pub-ad-placeholder-102"> </div> */}
        <p className="mv4 f2 f1-ns b tc">How do I stay safe?</p>
        {this.state.tipList.map(tip => <TipCard {...tip}  key={uuidv4()}/>)}

	    <input type="hidden" name="IL_IN_ARTICLE" />

      </div>
      
    );
  }
}

export default Guide;
