import React, { Component } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PanToolIcon from '@material-ui/icons/PanTool';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import GradientIcon from '@material-ui/icons/Gradient';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
        ]
      },
      {
        title: "Visitors",
        titleIcon: (<PeopleIcon />),
        points: [
          "Only have essential visitors and keep visits short",
          "Keep away from seniors and people with chronic medical conditions"
        ]
      },
      {
        title: "Avoid Contact",
        titleIcon: (<PanToolIcon />),
        points: [
          "Stay in a separate room away from other people in your home",
          "Rooms should have good airflow (e.g., open windows once in a while)"
        ]
      },
      {
        title: "Keep Distance",
        titleIcon: (<TransferWithinAStationIcon />),
        points: [
          "In a room with other people, keep a distance of at least 2 meters",
          "Wear a mask that covers your nose and mouth",
          "If you cannot wear a mask, people should wear a mask when near you"
        ]
      },
      {
        title: "Coughs and Sneezes",
        titleIcon: (<RecordVoiceOverIcon />),
        points: [
          "Cover your mouth and nose with a tissue when you cough or sneeze",
          "Cough or sneeze into your upper sleeve or elbow, not your hand",
          "Throw used tissues in a lined wastebasket and wash your hands"
        ]
      },
      {
        title: "Wash your hands",
        titleIcon: (<InvertColorsIcon />),
        points: [
          "Wash your hands often with soap and water",
          "Dry your hands with a paper towel, or with your own cloth towel",
          "Use an alcohol-based hand sanitizers"
        ]
      },
      {
        title: "Consider masks when",
        titleIcon: (<CallToActionIcon />),
        points: [
          "You must leave your house to see a health care provider",
          "You are within two metres of other people"
        ]
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
        ]
      },
      {
        title: "Laundry",
        titleIcon: (<GradientIcon />),
        points: [
          "Clothing and bedclothes can be cleaned using regular laundry soap",
          "Use disposable gloves when dealing with clothes with body fluids"
        ]
      },
      {
        title: "Waste management",
        titleIcon: (<DeleteForeverIcon />),
        points: [
          "All waste generated can be bagged in a regular plastic bag and disposed of in regular household waste",
          "Wash your hands after handling waste"
        ]
      },

    ];
    this.state = {
      tipList
    };
  }

  render() {

    return (
      <div className="center w-90 w-70-ns">
        <p className="mv4 f2 f1-ns b tc">How do I stay safe?</p>
        {this.state.tipList.map(tip => <TipCard {...tip} />)}
      </div>
      
    );
  }
}

export default Guide;
