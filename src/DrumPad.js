import React from 'react';

export default class DrumPad extends React.Component {
  render() {
    return (
      <div className="drum-pad btn btn-primary btn-block" id={this.props.keyCode + "-pad"} onClick={this.props.onClick}> 
        {this.props.keyCode}
        <audio id={this.props.keyCode} className="clip" src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" />
      </div>
    );
  }
}