import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import TCCard from '../ui/TCCard/TCCard';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import SendIcon from '@material-ui/icons/Send';
import HomeBtn from '../HomeBtn/HomeBtn';
import Btn from '../ui/Btn/Btn';

class AboutUs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      goalList: [
        {
          title: "A signal in the noise...",
          desc: `We understand that the COVID-19 outbreak has hit the world like
           no other. This, in addition to all the influx of information online 
           and in the media, there is a lot of noise, and it’s only growing. 
           Hence, we’ve made it a goal to provide you with the most succinct 
           summary of the status of the world right now. We hope that with the 
           information on this site, you can get a more comprehensive 
           understanding of the status of the Pandemic without all the clutter.`
        },
        {
          title: "Give you the latest",
          desc: `One thing that comes with an event such as the COVID-19 
          Pandemic is the frequency of change that information goes through. 
          Non-linear growth and rapid government action can change the situation quickly, and we get that. Hence, we have this very fact in mind while adding in more features and maintaining the platform, allowing us to provide you with the latest updates while you assess the situation.`
        },
        {
          title: "Providing guidance and education",
          desc: "It pays to be safe. Hospitals are being squeezed, medical professionals around the world are being overworked, and victims of the COVID-19 virus are having a bad time. Hence, we make sure that you can depend on us to stay up to date on safety measures and information needed to stay healthy and get through this difficult time with as much ease as possible."
        },
      ],
      feedback: "",
      feedbackBtnIsDisabled: false
    };
  }

  async sendFeedback() {
    await axios.post(`${process.env.REACT_APP_API_URL}/feedback`, {
      feedbackMsg: this.state.feedback
    });
    this.setState({
      feedbackBtnIsDisabled: true
    });
  }

  updateFeedback(feedback) {
    this.setState({ feedback });
  }

  render() {
    return (<div className="mt3 mb5 w-90 w-70-l center">
      <HomeBtn />
      <h1 className="f2 tc mv2">Our Goals</h1>
      
      <TCCard>
        {this.state.goalList.map(g => (<div key={uuidv4()}>
            <h1 className="f3 mid-gray mv3">{g.title}</h1>
            <h2 className="mid-gray">{g.desc}</h2>
          </div>))}
      </TCCard>
      <h1 className="f2 tc mt4 mb2 ">The Team</h1>
      <div className="flex flex-wrap w-100 w-80-l center">
        <TCCard className="mid-gray">
        <p className="f5 mid-gray">We’re a team of individuals focused on playing a crucial role in the fight against COVID-19. With our goals outlined above, we’re focused on incorporating those tenets with all of our features being rolled out, to give everyone visiting our site the best info possible. Connect with us below!</p>
        </TCCard>
      </div>
      <h1 className="f2 tc pt5 pb3">Connect With Us</h1>
      <p className="">Have tips, feedback or ideas? Let us know below!</p>
      <textarea
        value={this.state.feedback}
        className="ba b--light-silver br2 w-100 pa2"
        placeholder="Type your heart out..."
        maxlength="250"
        onChange={(e) => this.updateFeedback(e.target.value)}/>
      <Btn
        isDisabled={this.state.feedbackBtnIsDisabled}
        colour={"blue"}
        icon={(<SendIcon />)} handleOnClick={() => this.sendFeedback()}>Send</Btn>
    </div>);
  }
}

export default AboutUs;