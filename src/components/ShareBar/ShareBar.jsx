import React, { Component } from 'react';
import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
 } from "react-share";
import FacebookIcon from'@material-ui/icons/Facebook';
import TwitterIcon from'@material-ui/icons/Twitter';
import LinkedInIcon from'@material-ui/icons/LinkedIn';
import WhatsAppIcon from'@material-ui/icons/WhatsApp';

export class ShareBar extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <FacebookShareButton
          className="mh3"
          url={"trco.cc"}
          quote={""} // TODO
          >
            <div className="blue"><FacebookIcon/></div>
          </FacebookShareButton>
          <TwitterShareButton
          className="mh3"
          url={"trco.cc"}
          title={"trco.cc"}
          via={"trackthecovid19"}
          >
            <div className="light-blue"><TwitterIcon/></div>
          </TwitterShareButton>
          <LinkedinShareButton
          className="mh3"
          url={"trco.cc"}
          title={"Most Updated COVID-19 Stats"}
          summary={"Check out the latest stats at trco.cc"}
          source={"COVID-19 Tracker (Live)"}
          >
            <div className="blue"><LinkedInIcon/></div>
          </LinkedinShareButton>
          <WhatsappShareButton
          className="mh3"
          url={"trco.cc"}
          title={"Most Updated COVID-19 Stats on "}
          >
            <div className="green"><WhatsAppIcon/></div>
          </WhatsappShareButton>
      </div>
    );
  }

}

export default ShareBar;
