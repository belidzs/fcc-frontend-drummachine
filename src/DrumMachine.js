import React from 'react';
import * as ReactRedux from 'react-redux';
import DrumPad from "./DrumPad";
import './DrumMachine.css';

export default class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.play = this.play.bind(this);
  }
  
  usableKeys = [
    "Q", "W", "E", "A", "S", "D", "Z", "X", "C"
  ];
  
  handleKeyPress(event) {
    if (this.usableKeys.indexOf(event.key.toUpperCase()) > -1) {
      this.play(event.key.toUpperCase());
    }
  }

  handleClick(key) {
    this.play(key);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  play(key) {
    document.getElementById(key).play();
    this.props.playAction(key);
  }
  
  render() {
    const keyPad = [];
    for (let row=0; row<3; row++) {
      const rowArray = [];
      for (let col=0; col<3; col++) {
         rowArray.push(<div className="col" key={col}><DrumPad keyCode={this.usableKeys[row * 3 + col]} onClick={this.handleClick.bind(this,this.usableKeys[row * 3 + col])} /></div>);
      } 
      keyPad.push(<div className="row my-4" key={row}>{rowArray}</div>);
    }
       
    return (
      <div id="drum-machine-container" className="container">
        {keyPad}
        <div className="row mt-2 text-center">
          <div className="col">
            <h4>Last played: <span id="display">{this.props.lastPlayed}</span></h4>
          </div>
        </div>
      </div>
    );
  }
}

const PLAY = "PLAY";

const playAction = (keyCode) => {
  return {
    type: PLAY,
    keyCode: keyCode
  };
}

const mapStateToProps = (state) => {
    return {
      lastPlayed: state.lastPlayed
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        playAction: (key) => dispatch(playAction(key))
    };
}

export const DrumMachineContainer = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DrumMachine);