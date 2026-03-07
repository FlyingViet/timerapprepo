import React, { useEffect, useState } from 'react';
import Countdown from '../Components/CountdownV2';
import _ from 'lodash';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import "./timer.css";
import CircularJSON from 'circular-json';

const ResponsiveGrid = WidthProvider(GridLayout);

export default function Timer2() {
    const [name, setName] = useState('');
    const [map, setMap] = useState('');
    const [channel, setChannel] = useState('');
    const [notify, setNotify] = useState(false);
    const [delayMin, setDelayMin] = useState('0');
    const [delaySec, setDelaySec] = useState('20');

    const [layout, setLayout] = useState(() => {
        const saved = localStorage.getItem('timerLayout');
        return saved ? JSON.parse(saved) : [];
    });

    const [timers, setTimers] = useState(() => {
        const onRemove2 = (key) => {
            const localData = localStorage.getItem('timers');
            const js = localData ? CircularJSON.parse(localData) : [];
            var arr = [];
            _.forEach(js, item => {
                var it = item.props.children;
                arr.push(
                    <div key={it.key}>
                        <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove2}/>
                    </div>
                )
            });
            var arr2 = []
            _.forEach(arr, timer => {
                if(`${timer.key}` !== `${key}`) arr2.push(timer);
            });
            setTimers(arr2);
            setLayout(prev => prev.filter(item => item.i !== String(key)));
        }

        const localData = localStorage.getItem('timers');
        const js = localData ? CircularJSON.parse(localData) : [];
        var arr = [];
        _.forEach(js, item => {
            var it = item.props.children;
            arr.push(
                <div key={it.key}>
                    <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove2}/>
                </div>
            )
        });
        return arr;
    });

    const [key, setKey] = useState(() => {
        if(timers.length === 0) return 0;
        var item = timers[timers.length-1];
        return parseInt(item.key, 10) + 1;
    });

    useEffect(() => {
        localStorage.setItem('timers', CircularJSON.stringify(timers));
    }, [timers, key]);

    useEffect(() => {
        localStorage.setItem('timerLayout', JSON.stringify(layout));
    }, [layout]);

    const findFirstEmptySlot = (currentLayout) => {
        const occupied = new Set(currentLayout.map(item => `${item.x},${item.y}`));
        for (let y = 0; ; y++) {
            for (let x = 0; x < 6; x++) {
                if (!occupied.has(`${x},${y}`)) return { x, y };
            }
        }
    };

    const onAdd = () => {
        var time = [...timers];
        var k = key;
        const delaySecs = String((parseInt(delayMin, 10) || 0) * 60 + (parseInt(delaySec, 10) || 0));
        time.push(
            <div key={k}>
                <Countdown key={k} num={k} name={name} map={map} channel={channel} delay={delaySecs} notify={notify} remove={onRemove}/>
            </div>
        );
        const slot = findFirstEmptySlot(layout);
        setLayout(prev => [
            ...prev,
            { i: String(k), x: slot.x, y: slot.y, w: 1, h: 1 }
        ]);
        setTimers(time);
        setKey(k + 1);
    }

    const onRemove = (key) => {
        const localData = localStorage.getItem('timers');
        const js = localData ? CircularJSON.parse(localData) : [];
        var arr = [];
        _.forEach(js, item => {
            var it = item.props.children;
            arr.push(
                <div key={it.key}>
                    <Countdown key={it.key} num={it.key} name={it.props.name} map={it.props.map} channel={it.props.channel} delay={it.props.delay} notify={it.props.notify} remove={onRemove}/>
                </div>
            )
        });
        var arr2 = []
        _.forEach(arr, timer => {
            if(`${timer.key}` !== `${key}`) arr2.push(timer);
        });
        setTimers(arr2);
        setLayout(prev => prev.filter(item => item.i !== String(key)));
    }

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
    }

    return (
        <div>
            <div className="add-timer-bar">
                <input
                    type='text'
                    placeholder='Name'
                    maxLength={12}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Map'
                    onChange={e => setMap(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Ch'
                    maxLength={2}
                    className="input-sm"
                    onChange={e => setChannel(e.target.value)}
                />
                <div className="delay-input">
                    <span className="delay-label">Notify every</span>
                    <input
                        type='number'
                        placeholder='0'
                        min='0'
                        max='9'
                        className="input-time"
                        onChange={e => setDelayMin(e.target.value)}
                    />
                    <span className="delay-colon">:</span>
                    <input
                        type='number'
                        placeholder='20'
                        min='0'
                        max='59'
                        className="input-time"
                        onChange={e => setDelaySec(e.target.value)}
                    />
                </div>
                <label className="notify-label">
                    <input type='checkbox' onChange={() => setNotify(n => !n)} />
                    Notify?
                </label>
                <button className="btn-add" onClick={onAdd}>+ Add Timer</button>
            </div>

            <ResponsiveGrid
                className="timer-grid-layout"
                layout={layout}
                cols={6}
                rowHeight={220}
                draggableHandle=".drag-handle"
                onLayoutChange={handleLayoutChange}
                margin={[16, 16]}
                containerPadding={[24, 24]}
            >
                {_.map(timers, timer => timer)}
            </ResponsiveGrid>
        </div>
    );
}
