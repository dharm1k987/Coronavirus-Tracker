import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import TCCard from '../ui/TCCard/TCCard';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeBtn from '../HomeBtn/HomeBtn';

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
      teamList: [
        {
          name: "Vinit Soni",
          education: "Computer Science @ University of Waterloo",
          contactLink: "https://linkedin.com/in/vinitsoni",
          githubLink: "https://github.com/cybervinit",
          imgSrc: "vinit_pic.jpg",
          "imgAlt": "vinit_covid"
        },
        {
          name: "Mirza Abubacker",
          education: "Business Technology Management @ Ryerson University",
          contactLink: "https://linkedin.com/in/mirza-abubacker",
          imgSrc: "mirza_pic.jpg",
          "imgAlt": "mirza_covid"
        },
        {
          name: "Dharmik Shah",
          education: "Computer Science @ University of Toronto",
          contactLink: "https://www.linkedin.com/in/dharmikshah987/",
          githubLink: "https://github.com/dharm1k987",
          imgSrc: "dharmik_pic.jpg",
          imgAlt: "dharmik_covid"
        },
      ],
      feedback: ""
    };
  }

  sendFeedback() {
    axios.post(`${process.env.REACT_APP_API_URL}/feedback`, {
      feedbackMsg: this.state.feedback
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
        {this.state.teamList.map(m => (
        <div className="center w-30-l mv3" key={uuidv4()}>
          <TCCard>
            <div className="tc mt4">
              <img className="h5 w5 h-75-ns w-75-ns br-100 dib" src={`${m.imgSrc}`} alt={`${m.imgAlt}`}/>
            </div>
            <h1 className="f3 tc mt3 mb1 mid-gray">{m.name}</h1>
            <p className="f5 tc mv2 mid-gray">{m.education}</p>
            <a href={`${m.contactLink}`} target="_blank" className="flex justify-center mid-gray">
              <LinkedInIcon className="mh2"/>
              <p>Contact me</p>
            </a>
            {m.githubLink ? <a href={`${m.githubLink}`} target="_blank" className="flex justify-center mid-gray">
              <GitHubIcon className="mh2"/>
              <p>GitHub</p>
            </a> : <div></div>}
          </TCCard>
        </div>
        ))}
      </div>
    </div>);
  }
}

export default AboutUs;