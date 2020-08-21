import React, { Component } from 'react';
import Confetti from 'react-confetti';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
import { v4 as uuidv4 } from 'uuid';
import HomeBtn from '../HomeBtn/HomeBtn';
import { Btn } from '../ui/Btn/Btn'


export class Covid19ReadinessTest extends Component {

  constructor (props) {
    super(props);
    const actionList = [
      {
        str: "Follow WHO Guidelines",
        actualPoints: 10,
        currentPoints: 10
      },
      {
        str: "Wash Your Hands",
        actualPoints: 9,
        currentPoints: 9
      },
      {
        str: "Social Distancing",
        actualPoints: 8,
        currentPoints: 8
      },
      {
        str: "Coughing in your Elbow",
        actualPoints: 7,
        currentPoints: 7
      },
      {
        str: "Avoid Touching your Face",
        actualPoints: 6,
        currentPoints: 6
      },
      {
        str: "Cleaning your Home",
        actualPoints: 5,
        currentPoints: 5
      },
      {
        str: "Avoid Sharing Personal Items",
        actualPoints: 4,
        currentPoints: 4
      },
      {
        str: "Staying Socially Connected Online",
        actualPoints: 3,
        currentPoints: 3
      },
      {
        str: "Monitoring Symptoms",
        actualPoints: 2,
        currentPoints: 2
      },
      {
        str: "Wearing a Mask",
        actualPoints: 1,
        currentPoints: 1
      },
    ];
    this.state = {
      quizState: 0, // 0: Intro Screen, 1: Quiz Screen, 2: Result Screen
      actionAmount: 10,
      disabledBtnList: Array(10).fill(false),
      actionList,
      totalScore: 0,
    };
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  startQuiz() {
    this.setState({ quizState: 1 });
  }

  goToIntroScreen() {
    this.setState({
      quizState: 0, // 0: Intro Screen, 1: Quiz Screen, 2: Result Screen
    });
  }

  componentDidMount() {
    if (this.state.actionList) {
      let currActionList = this.state.actionList;
      this.shuffleArray(currActionList);
      this.setState({ actionList: currActionList });
    }
  }

  restartQuiz() {
    const actionList = [
      {
        str: "Follow WHO Guidelines",
        actualPoints: 10,
        currentPoints: 10
      },
      {
        str: "Wash Your Hands",
        actualPoints: 9,
        currentPoints: 9
      },
      {
        str: "Social Distancing",
        actualPoints: 8,
        currentPoints: 8
      },
      {
        str: "Coughing in your Elbow",
        actualPoints: 7,
        currentPoints: 7
      },
      {
        str: "Avoid Touching your Face",
        actualPoints: 6,
        currentPoints: 6
      },
      {
        str: "Cleaning your Home",
        actualPoints: 5,
        currentPoints: 5
      },
      {
        str: "Avoid Sharing Personal Items",
        actualPoints: 4,
        currentPoints: 4
      },
      {
        str: "Staying Socially Connected Online",
        actualPoints: 3,
        currentPoints: 3
      },
      {
        str: "Monitoring Symptoms",
        actualPoints: 2,
        currentPoints: 2
      },
      {
        str: "Wearing a Mask",
        actualPoints: 1,
        currentPoints: 1
      },
    ];
    this.shuffleArray(actionList);
    this.resetQuizState(actionList);
    this.goToIntroScreen();
  }

  resetQuizState(actionList) {
    for (let i = 0; i < this.state.actionAmount; i++) {
      actionList[i].currentPoints = actionList[i].actualPoints;
    }
    this.setState({
      actionAmount: 10,
      disabledBtnList: Array(10).fill(false),
      actionList,
      totalScore: 0,
    });
  }

  onClickAction(i) {
    if (this.state.disabledBtnList[i]) return;
    let updatedDisabledBtnList = this.state.disabledBtnList;
    updatedDisabledBtnList[i] = true;
    this.setState({ disabledBtnList: updatedDisabledBtnList });
    const updatedTotalScore = this.state.totalScore + this.state.actionList[i].currentPoints;
    let updatedActionList = this.state.actionList.map((a, j) => {
      if ((j === i) || (this.state.disabledBtnList[j])) return a;
      return {
        ...a,
        currentPoints: a.currentPoints > this.state.actionList[i].currentPoints ? a.currentPoints - 1 : a.currentPoints
      };
    });
    this.setState({
      actionList: updatedActionList,
      disabledBtnList: updatedDisabledBtnList,
      totalScore: updatedTotalScore
    });
    if (updatedDisabledBtnList.filter(d => d).length === this.state.actionAmount) {
      this.setState({ quizState: 2 });
      return;
    }
  }

  getGrade() {
    const score = this.state.totalScore;
    if (score <= 15) return 'D';
    if (score <= 20) return 'C';
    if (score <= 26) return 'B-';
    if (score <= 32) return 'B';
    if (score <= 38) return 'B+';
    if (score <= 42) return 'A-';
    if (score <= 48) return 'A';
    if (score <= 55) return 'A+';
  }

  render() {

    return (
      <div className="center w-90 w-70-ns ">
        <HomeBtn />

        {this.state.quizState === 0 ? <div>
          <div className="f2 tc mv3 b">COVID-19 Readiness Test</div>
          <div className="f4 mv3 ph3 tc-ns"><b>Instructions:</b> Order the items in the list from <b>most important</b> to <b>least important</b></div>
              <Btn colour="green" icon={<PlayArrowIcon />} handleOnClick={(e) => this.startQuiz()}>Start</Btn>


        </div>: <div></div>}
        {this.state.quizState === 1 ? <div>
          <div className="f4 tc b mt4 mb2">Pick from Most Important to Least Important</div>

          {/* <Btn colour="red" icon={<ReplayIcon />} handleOnClick={(e) => this.resetQuizState(this.state.actionList)} /> */}

          {/* Not sure how to do this one, start guess is above */}
          <button onClick={(e) => this.resetQuizState(this.state.actionList)} className="mb4 mt1 flex center br-pill light-red ba pa2 bg-white shadow-4 bw1 b--light-red">
            <ReplayIcon />
          </button>
          
          <div className="tc">
            {this.state.actionList.map((ai, i) => <div key={uuidv4()}>
              {/* Leave this one alone */}
              <button onClick={(e) => this.onClickAction(i)} 
                className={`ba b center w-80
                  bw1
                  ${this.state.disabledBtnList[i] ? 'bg-green white b--white' : 'b--blue bg-white blue shadow-4'}
                  br3 f5 pa2 ma2`}
              >
                <div className="tc w-100">{ai.str}</div>
              </button>
            </div>)}
          </div>
        </div> : <div></div>}
        {this.state.quizState === 2 ? <div>
          {this.state.totalScore > 32 ? <Confetti /> : <div></div>}
          <div className="f2 tc mt4 mb3 b">Your COVID-19 Pandemic Rating</div>
          <div className="flex justify-center">
            <div className="f-headline dib justify-center lh-title tc b mv4 mv3 ph4 ba bw0 br4 bg-gold white shadow-4">{this.getGrade()}</div>
          </div>
          <div className="f3 tc mt4">{this.state.totalScore < 30 ?
            "Nice try! See if you can review your priorities again" :
            "Awesome! You are ready! Share this with your family and friends to let them know you can take care of yourself" }</div>
          <div className="f6 tc mv1">(Highest Possible Rating: A+)</div>

            <Btn colour="blue" icon={<ReplayIcon />} handleOnClick={(e) => this.restartQuiz()}>Retry Quiz</Btn>

            {/* <button className="ba bw1 b b--blue shadow-3 br3 f5 blue w-100 mv5 bg-white" onClick={(e) => this.restartQuiz()}>
              <div className="flex justify-center">
                <ReplayIcon className="mv2"/>
                <div className="mv2 mh2">Retry quiz</div>
              </div>
            </button> */}
        </div>: <div></div>}
      </div>
     
    );
  }
}

export default Covid19ReadinessTest;
