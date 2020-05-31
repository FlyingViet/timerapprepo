import React, { Component } from "react";
import swal from 'sweetalert2';
import * as workerTimers from 'worker-timers';
import "../App.css";

export default class Countdown extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0
    };

    startTimer = () => {
        if(this.state.timerOn) return;
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: this.state.timerTime
        });
        this.timer = workerTimers.setInterval(() => {
          const newTime = this.state.timerTime - 10;
          if (newTime >= 0) {
            this.setState({
              timerTime: newTime
            });
            if(((newTime / 60000) % 60) % 9.85 === 0){
              swal.fire({
                title: `${this.props.name} needs a tap`,
                confirmButtonText: 'OK',
                onOpen: () => {
                  var sound = new Audio('http://limonte.github.io/mp3/zippi.mp3');
                  sound.play();
                }
              });
            }
          } else {
            workerTimers.clearInterval(this.timer);
            this.setState({ timerOn: false });
            swal.fire({
              title: `${this.props.name} has finished`,
              text: 'Service Done',
              confirmButtonText: 'OK'
            });
          }
        }, 10);
      };

      stopTimer = () => {
        if(!this.state.timerOn) return;
        workerTimers.clearInterval(this.timer);
        this.setState({ timerOn: false });
      };

      adjustTimer = input => {
        const { timerTime, timerOn } = this.state;
        const max = 216000000;
        if (!timerOn) {
          if (input === "incHours" && timerTime + 3600000 < max) {
            this.setState({ timerTime: timerTime + 3600000 });
          } else if (input === "decHours" && timerTime - 3600000 >= 0) {
            this.setState({ timerTime: timerTime - 3600000 });
          } else if (input === "incMinutes" && timerTime + 60000 < max) {
            this.setState({ timerTime: timerTime + 60000 });
          } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
            this.setState({ timerTime: timerTime - 60000 });
          } else if (input === "incSeconds" && timerTime + 1000 < max) {
            this.setState({ timerTime: timerTime + 1000 });
          } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
            this.setState({ timerTime: timerTime - 1000 });
          }
        }
      };

      remove = () => {
        this.props.remove(this.props.num);
    }

  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div className="Countdown">
        <div className="Stopwatch-header">
            <label type='text' className="label">Name: {this.props.name}</label>
            <label type='text' className="label">Map: {this.props.map}</label>
            <label type='text' className="label">Channel: {this.props.channel}</label>
        </div>
        <div className="Countdown-label">Hours : Minutes : Seconds</div>
        <div className="Countdown-display">
        <button onClick={() => this.adjustTimer("incHours")}>&#8679;</button>
        <button onClick={() => this.adjustTimer("incMinutes")}>&#8679;</button>
        <button onClick={() => this.adjustTimer("incSeconds")}>&#8679;</button>
        <div className="Countdown-time">
        {hours} : {minutes} : {seconds}
        </div>

        <button onClick={() => this.adjustTimer("decHours")}>&#8681;</button>
        <button onClick={() => this.adjustTimer("decMinutes")}>&#8681;</button>
        <button onClick={() => this.adjustTimer("decSeconds")}>&#8681;</button>
        </div>
{/* 
            {timerOn === false &&
            (timerStart === 0 || timerTime === timerStart) && (
                <button onClick={this.startTimer}>Start</button>
            )}
            {timerOn === true && timerTime >= 1000 && (
            <button onClick={this.stopTimer}>Stop</button>
            )}
            {timerOn === false &&
            (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
                <button onClick={this.startTimer}>Resume</button>
            )}
            {(timerOn === false || timerTime < 1000) &&
            (timerStart !== timerTime && timerStart > 0) && (
                <button onClick={this.resetTimer}>Reset</button>
            )} */}
            <button onClick={this.startTimer}>Start</button>
            <button onClick={this.stopTimer}>Stop</button>
            <button onClick={this.remove}>Remove</button>
      </div>
    );
  }
}
