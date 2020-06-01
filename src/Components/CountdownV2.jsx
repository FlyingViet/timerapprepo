import React, { Component } from "react";
import swal from 'sweetalert2';
import cron from 'node-schedule';
import * as workerTimers from 'worker-timers';
import "../App.css";



export default class CountdownV2 extends Component {
    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        timerEnd: 0
    };

    startTimer = () => {
        if(this.state.timerOn) return;
        var rule = new cron.RecurrenceRule();
        rule.seconds = 10;
        rule.minutes = 1;
        workerTimers.setInterval(() => {
            swal.fire({
                title: `${this.props.name} needs a tap`,
                confirmButtonText: 'OK',
                onOpen: () => {
                  var sound = new Audio('http://limonte.github.io/mp3/zippi.mp3');
                  sound.play();
                }
              });
        }, 570000)
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: this.state.timerTime,
          timerEnd: Date.now() + this.state.timerTime
        });

        this.timer = workerTimers.setInterval(() => {
          //const newTime = this.state.timerTime - 10;
          const newTime = this.state.timerEnd - Date.now();

          if (newTime >= 0) {
            this.setState({
              timerTime: newTime
            });
            // var minutes = ((newTime / 60000) % 60);
            // if( (minutes + 1) % 9.85 === 0 ||  (minutes) % 9.85 === 0 ||  (minutes - 1) % 9.85 === 0){
            //   swal.fire({
            //     title: `${this.props.name} needs a tap`,
            //     confirmButtonText: 'OK',
            //     onOpen: () => {
            //       var sound = new Audio('http://limonte.github.io/mp3/zippi.mp3');
            //       sound.play();
            //     }
            //   });
            // }
          } else {
            workerTimers.clearInterval(this.timer);
            this.setState({ timerOn: false });
            swal.fire({
              title: `${this.props.name} has finished`,
              text: 'Service Done',
              confirmButtonText: 'OK'
            });
          }
        }, 1);
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
        this.setState({timerOn: false})
    }
    renderPt1 = () => {
      return(
        <div>
          <div className="Countdown-label">Hours : Minutes : Seconds</div>
        <button onClick={() => this.adjustTimer("incHours")}>&#8679;</button>
        <button onClick={() => this.adjustTimer("incMinutes")}>&#8679;</button>
        <button onClick={() => this.adjustTimer("incSeconds")}>&#8679;</button>
      </div>
      );
    }

    renderPt2 = () => {
      return(
        <div>
          <button onClick={() => this.adjustTimer("decHours")}>&#8681;</button>
          <button onClick={() => this.adjustTimer("decMinutes")}>&#8681;</button>
          <button onClick={() => this.adjustTimer("decSeconds")}>&#8681;</button>
        </div>
      );
    }
    renderHeader = () => {
      return(
        <div>
            <div className="Stopwatch-header">
            <label type='text' className="label">{this.props.name}</label>
            <label type='text' className="label">{this.props.map}</label>
            <label type='text' className="label">{this.props.channel}</label>
        </div>
        </div>
      )
    }
  render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <center>
        <div className="Countdown">

        {!this.props.name && !this.props.map && !this.props.channel ? null : this.renderHeader()}

        <div className="Countdown-display">

        {this.state.timerOn ? null : this.renderPt1()}
        
        <div className="Countdown-time">
          {hours} : {minutes} : {seconds}
        </div>

        {this.state.timerOn ? null : this.renderPt2()}
        </div>
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.stopTimer}>Stop</button>
          <button onClick={this.remove}>Remove</button>
      </div>
      </center>
    );
  }
}
