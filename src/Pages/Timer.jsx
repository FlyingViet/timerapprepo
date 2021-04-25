import React, { useEffect, useState } from 'react';
import Countdown from '../Components/CountdownV2';
import _ from 'lodash';
import "./timer.css";
import "./../../node_modules/react-grid-layout/css/styles.css";
import "./../../node_modules/react-resizable/css/styles.css";
import GridLayout from 'react-grid-layout';

export default function Timer() {

    const [timers, setTimers] = useState([]);
    const [name, setName] = useState('');
    const [map, setMap] = useState('');
    const [channel, setChannel] = useState('');
    const [notify, setNotify] = useState(false);
    const [key, setKey] = useState(0);
    const [delay, setDelay] = useState('20');

    useEffect(() => {
        checkExisting();
    }, [])

    const onAdd = () => {
        var time = timers;
        var k = key;
        time.push(
        <div className="timerApp" key={k}>
            <Countdown key={k} num={k} name={name} map={map} channel={channel} delay={delay} notify={notify} remove={onRemove}/>
        </div>
        )
        k++;
        setTimers(time);
        setKey(k);
        localStorage.setItem('timers', JSON.stringify(timers));
    }
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleMapChange = (e) => {
        setMap(e.target.value);
    }

    const handleChannelChange = (e) => {
        setChannel(e.target.value);
    }

    const handleDelayChange = (e) => {
        setDelay(e.target.value);
    }

    const onCheck = () => {
        if(notify) setNotify(false);
        else setNotify(true);
    }

    const onRemove = (key) => {
        var time = [...timers];
        _.remove(time, timer => {
            return `${timer.key}` === `${key}`;
        });
        setTimers(time);
        localStorage.setItem('timers', JSON.stringify(timers));
    }

    const checkExisting = () => {
        const t = localStorage.getItem('timers');
        const js = JSON.parse(t);
        var arr = [];
        _.forEach(js, item => {
            var it = item.props.children;
            arr.push(
                <div className="timerApp" key={it.key}>
                    <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove}/>
                </div>
            )
            var k = parseInt(it.key, 10) + 1;
            setKey(k);
        });
        setTimers(arr);
    }

    const onRemove2 = (key) => {
        var time = [...timers];
        _.remove(time, timer => {
            return `${timer.key}` === `${key}`;
        });
        setTimers(time);
        localStorage.setItem('timers', JSON.stringify(timers));
    }

    const recreateComponents = () => {
        var arr = [];
        _.forEach(timers, item => {
            console.log(item);
            var it = item.props.children;
            arr.push(
                <div className="timerApp" key={it.key}>
                    <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove2}/>
                </div>
            )
        });
        if(arr.length !== 0) {
            setTimers(arr);
        }
    }

    recreateComponents();
   
    return(
        <div >
            <input type='text' placeholder='Name' className="label" maxLength={12} onChange={e => handleNameChange(e)}></input>
            <input type='text' placeholder='Map' className="label" onChange={e => handleMapChange(e)}></input>
            <input type='text' placeholder='Channel' className="label" maxLength={2} onChange={e => handleChannelChange(e)}></input>
            <input type='text' placeholder='Seconds before 10 Minutes' className="label" onChange={e => handleDelayChange(e)}></input>
            <input type='checkbox' id='notify' name='notify' label='Notify For Tap?' onChange={e => onCheck(e)}/>
            <label for="notify">Notify?</label>
            <button onClick={onAdd}>Add</button>
            <GridLayout
                className="layout"
                preventCollision={true}
                verticalCompact={true}
                width={4000}
                rowHeight={150}
                autoSize={true}
            >  
                {_.map(timers, timer => {
                    return timer;
                })}
            </GridLayout>
        </div>
    );

}