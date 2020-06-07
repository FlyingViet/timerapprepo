import React from 'react';
import Countdown from '../Components/CountdownV2';
import _ from 'lodash';
import "./timer.css";
import "./../../node_modules/react-grid-layout/css/styles.css";
import "./../../node_modules/react-resizable/css/styles.css";
import GridLayout from 'react-grid-layout';

export default class Timer extends React.Component {
    state = {
        timers: [],
        name: '',
        map: '',
        channel:'',
        key: 0,
        delay: '20',
        notify: false
    }

    onAdd = () => {
        var timers = this.state.timers;
        var key = this.state.key;
        timers.push(<div className="timerApp" key={key}>
            <Countdown key={key} num={key} name={this.state.name} map={this.state.map} channel={this.state.channel} delay={this.state.delay} notify={this.state.notify} remove={this.onRemove}></Countdown>
        </div>)
        key++;
        this.setState({timers: timers, key: key});
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

    handleDelayChange = (e) => {
        this.setState({delay: e.target.value});
    }

    onCheck = (e) => {
        if(this.state.notify) this.setState({notify: false});
        else this.setState({notify: true});
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
                <input type='text' placeholder='Name' className="label" maxLength={12} onChange={e => this.handleNameChange(e)}></input>
                <input type='text' placeholder='Map' className="label" onChange={e => this.handleMapChange(e)}></input>
                <input type='text' placeholder='Channel' className="label" maxLength={2} onChange={e => this.handleChannelChange(e)}></input>
                <input type='text' placeholder='Seconds before 10 Minutes' className="label" onChange={e => this.handleDelayChange(e)}></input>
                <input type='checkbox' id='notify' name='notify' label='Notify For Tap?' onChange={e => this.onCheck(e)}/>
                <label for="notify">Notify?</label>
                <button onClick={this.onAdd}>Add</button>
                <GridLayout
                    className="layout"
                    preventCollision={true}
                    verticalCompact={true}
                    width={4000}
                    rowHeight={150}
                    autoSize={true}
                >  
                    {_.map(this.state.timers, timer => {
                        return timer;
                    })}
                </GridLayout>
            </div>
        );
    }
}