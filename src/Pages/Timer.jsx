import React from 'react';
import Stopwatch from '../Components/Stopwatch';
import _ from 'lodash';
import "./timer.css";

export default class Timer extends React.Component {
    state = {
        timers: [],
        name: '',
        map: '',
        channel:''
    }

    onAdd = () => {
        console.log(this.state);
        var timers = this.state.timers;
        timers.push(<div className="timerApp" key={timers.length}>
            <Stopwatch key={timers.length} num={timers.length} name={this.state.name} map={this.state.map} channel={this.state.channel} remove={this.onRemove}></Stopwatch>
        </div>)
        this.setState({timers: timers});
    }
    
    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    handleMapChange = (e) => {
        this.setState({ map: e.target.value });
    }

    handleChannelChange = (e) => {
        this.setState({ channel: e.target.value });
    }

    onRemove = (key) => {
        var timers = this.state.timers;
        _.remove(timers, timer => {
            return `${timer.key}` === `${key}`;
        });
        this.setState({timers: timers});
    }

    render(){
        return(
            <div >
                <center>
                    <input type='text' placeholder='Name' className="label" onChange={e => this.handleNameChange(e)}></input>
                    <input type='text' placeholder='Map' className="label" onChange={e => this.handleMapChange(e)}></input>
                    <input type='text' placeholder='Channel' className="label" onChange={e => this.handleChannelChange(e)}></input>
                    <button onClick={this.onAdd}>Add</button>
                    {_.map(this.state.timers, timer => {
                        return timer;
                    })}
                </center>
            </div>
        );
    }
}