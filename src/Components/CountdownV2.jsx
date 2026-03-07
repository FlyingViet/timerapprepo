import React, { Component } from "react";
import swal from 'sweetalert2';
import * as workerTimers from 'worker-timers';
import "../App.css";
import ding from '../Sounds/ding.mp3';


export default class CountdownV2 extends Component {
    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        timerEnd: 0
    };

    startTimer = () => {
        if(this.state.timerOn) return;
        if(this.state.timerTime === 0) return;
        const delayMs = parseInt(this.props.delay, 10) * 1000;
        if(this.props.notify && delayMs > 0){
          this.cron = workerTimers.setInterval(() => {
            swal.fire({
                title: `${this.props.name} needs a tap`,
                confirmButtonText: 'OK',
                timer: 2000,
                imageUrl: 'https://i.imgur.com/acowcCb.png',
                onOpen: () => {
                  var sound = new Audio(ding);
                  sound.play();
                }
              });
        }, delayMs);
        }
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: this.state.timerTime,
          timerEnd: Date.now() + this.state.timerTime
        });

        this.timer = workerTimers.setInterval(() => {
          const newTime = this.state.timerEnd - Date.now();

          if (newTime >= 0) {
            this.setState({
              timerTime: newTime
            });
          } else {
            workerTimers.clearInterval(this.timer);
            workerTimers.clearInterval(this.cron);
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
        if (this.timer !== undefined) { workerTimers.clearInterval(this.timer); this.timer = undefined; }
        if (this.cron !== undefined) { workerTimers.clearInterval(this.cron); this.cron = undefined; }
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
        if (this.timer !== undefined) { workerTimers.clearInterval(this.timer); this.timer = undefined; }
        if (this.cron !== undefined) { workerTimers.clearInterval(this.cron); this.cron = undefined; }
        this.setState({timerOn: false});
        this.props.remove(this.props.num);
    }

  render() {
    const { timerTime, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    const hasHeader = this.props.name || this.props.map || this.props.channel;

    return (
      <div className="Countdown">
        <button className="btn-close" onClick={this.remove} title="Remove">✕</button>
        <div className="drag-handle" title="Drag to rearrange">
          <span className="drag-dots">⠿</span>
          {this.props.name && <span className="drag-title">{this.props.name}</span>}
        </div>
        {(this.props.map || this.props.channel) && (
          <div className="Stopwatch-header">
            {this.props.map && <span className="stopLabel">{this.props.map}</span>}
            {this.props.channel && <span className="stopLabel">Ch {this.props.channel}</span>}
          </div>
        )}

        <div className="Countdown-display">
          {!timerOn && (
            <div className="adjust-row">
              <button className="btn-adjust" onClick={() => this.adjustTimer("incHours")}>&#8679;</button>
              <button className="btn-adjust" onClick={() => this.adjustTimer("incMinutes")}>&#8679;</button>
              <button className="btn-adjust" onClick={() => this.adjustTimer("incSeconds")}>&#8679;</button>
            </div>
          )}

          <div className="Countdown-label">HH &nbsp;: &nbsp;MM &nbsp;: &nbsp;SS</div>

          <div className="Countdown-time">
            {hours}:{minutes}:{seconds}
          </div>

          {!timerOn && (
            <div className="adjust-row">
              <button className="btn-adjust" onClick={() => this.adjustTimer("decHours")}>&#8681;</button>
              <button className="btn-adjust" onClick={() => this.adjustTimer("decMinutes")}>&#8681;</button>
              <button className="btn-adjust" onClick={() => this.adjustTimer("decSeconds")}>&#8681;</button>
            </div>
          )}
        </div>

        <div className="timer-actions">
          <button
            className={timerOn ? "btn-stop" : "btn-start"}
            onClick={timerOn ? this.stopTimer : this.startTimer}
          >
            {timerOn ? "Stop" : "Start"}
          </button>
        </div>
      </div>
    );
  }
}
