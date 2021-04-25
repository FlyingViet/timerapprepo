import React from 'react';
import LoginBox from '../Components/loginbox'
import Timer from './Timer';
import Timer2 from './Timer2';

export default function Login(){
    return(
        <div>
            {redirectPage()}
        </div>
    )
}

function redirectPage() {
    var logged = localStorage.getItem('login');
    
    return ((logged === null || logged === undefined)|| logged.length === 0) ? <LoginBox/> : <Timer2/>;
}