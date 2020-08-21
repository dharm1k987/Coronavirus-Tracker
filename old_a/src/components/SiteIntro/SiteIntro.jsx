import React, { Component } from 'react';
import { TCCard } from '../ui/TCCard/TCCard';


export class SiteIntro extends Component {
  render() {
    return (
      <TCCard>
      <h1 className="mid-gray">COVID-19 CORONAVIRUS UPDATE</h1> 
      <h2 className="mid-gray">

        This site will serve as a <b>tracker</b> to the worldwide <b>COVID 19 Coronavirus pandemic</b>, that originated in <b>Wuhan, China</b>.
        <br></br><br></br>
        We offer <b>statistics</b> on the <b>latest virus outbreak</b>, and report figures of <b>total confirmed cases (infected), deaths and recoveries</b>.
        These numbers are accurate as per the <b>World Health Organization</b> and are <b>updated every few minutes</b>.
        <br></br><br></br>

        Clicking on a <b>country</b> will show a counter of the <b>current status</b> in that location. There will also be <b>world</b> news which you may
        refer to get the latest information.<br></br><br></br>

        Our goal is to provide <b>accurate information</b>, while at the same time keep it <b>succinct and relevant</b> instead of a full encyclopedia.

      </h2> 
    </TCCard>
    );
  }

}

export default SiteIntro;
