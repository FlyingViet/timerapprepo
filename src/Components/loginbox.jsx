import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import './login.css';
import { Link } from 'react-router-dom';

export default function LoginBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleEmail = event => {
        setEmail(event.target.value);
    }

    const handlePassword = event => {
        setPassword(event.target.value);
    }

    const handleLogin = event => {
        console.log(email, password);
        localStorage.setItem('login', JSON.stringify({email, password}));
        console.log(localStorage);
    }


    return(
        <div className="login">
            <div className="loginField">
                <TextField className="textField" id="standard-basic" label="Email" onInput={handleEmail}/>
            </div>
            <div className="loginField">
                <TextField className="textField" id="standard-basic" label="Password" onInput={handlePassword}/>
            </div>
            
            <Link className="loginButton" variant="contained" onClick={handleLogin} to='/Timer'>Login</Link>
        </div>
    )
}