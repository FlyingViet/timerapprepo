import React, { useEffect, useState } from 'react';
import Countdown from '../Components/CountdownV2';
import _ from 'lodash';
import "./timer.css";
import "./../../node_modules/react-grid-layout/css/styles.css";
import "./../../node_modules/react-resizable/css/styles.css";
import GridLayout from 'react-grid-layout';
import CircularJSON from 'circular-json';

export default function Timer2() {
    const [name, setName] = useState('');
    const [map, setMap] = useState('');
    const [channel, setChannel] = useState('');
    const [notify, setNotify] = useState(false);
    const [delay, setDelay] = useState('20');
    const [timers, setTimers] = useState(() => {
        const onRemove2 = (key) => {
            const localData = localStorage.getItem('timers');
            const js = localData ? CircularJSON.parse(localData) : [];
            var arr = [];
            _.forEach(js, item => {
                var it = item.props.children;
                arr.push(
                    <div className="timerApp" key={it.key}>
                        <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove2}/>
                    </div>
                )
                
            });
            var arr2 = []
            _.forEach(arr, timer => {
                if(`${timer.key}` !== `${key}`){
                    arr2.push(timer);
                }
            });
            setTimers(arr2);
        }

        const localData = localStorage.getItem('timers');
        const js = localData ? CircularJSON.parse(localData) : [];
        var arr = [];
        _.forEach(js, item => {
            var it = item.props.children;
            arr.push(
                <div className="timerApp" key={it.key}>
                    <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove2}/>
                </div>
            )
            
        });
        return arr;
    });
    const [key, setKey] = useState(() => {
        if(timers.length === 0) return 0;
        var item = timers[timers.length-1];
        console.log(item);
        return parseInt(item.key, 10) + 1;
    });

    useEffect(() => {
        localStorage.setItem('timers', CircularJSON.stringify(timers));
        console.log(timers);
        console.log(key);
    }, [timers, key]);

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
        const localData = localStorage.getItem('timers');
        const js = localData ? CircularJSON.parse(localData) : [];
        var arr = [];
        _.forEach(js, item => {
            var it = item.props.children;
            arr.push(
                <div className="timerApp" key={it.key}>
                    <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove}/>
                </div>
            )
            
        });
        var arr2 = []
        _.forEach(arr, timer => {
            if(`${timer.key}` !== `${key}`){
                arr2.push(timer);
            }
        });
        setTimers(arr2);
    }

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