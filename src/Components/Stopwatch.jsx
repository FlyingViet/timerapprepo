import React from 'react';
import "../App.css";
export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0
    };

    startTimer = () => {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
          this.setState({
            timerTime: Date.now() - this.state.timerStart
          });
        }, 10);
    };

    stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.timer);
      };
      resetTimer = () => {
        this.setState({
          timerStart: 0,
          timerTime: 0
        });
    };

    remove = () => {
        //console.log(this.props.num);
        this.props.remove(this.props.num);
    }
    render() {
        const { timerTime } = this.state;
        let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

        return(
            <div className='Stopwatch'>
                <div className="Stopwatch-header">
                    <label type='text' className="label">Name: {this.props.name}</label>
                    <label type='text' className="label">Map: {this.props.map}</label>
                    <label type='text' className="label">Channel: {this.props.channel}</label>
                </div>
                <div className="Stopwatch-display">
                    {hours} : {minutes} : {seconds} : {centiseconds}
                </div>
                {this.state.timerOn === false && this.state.timerTime === 0 && (
                    <button onClick={this.startTimer}>Start</button>
                    )}
                    {this.state.timerOn === true && (
                    <button onClick={this.stopTimer}>Stop</button>
                    )}
                    {this.state.timerOn === false && this.state.timerTime > 0 && (
                    <button onClick={this.startTimer}>Resume</button>
                    )}
                    {this.state.timerOn === false && this.state.timerTime > 0 && (
                    <button onClick={this.resetTimer}>Reset</button>
                    )}
                <button onClick={this.remove}>Remove</button>
            </div>
            
        );
    }
}