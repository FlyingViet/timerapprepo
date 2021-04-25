import React from 'react';
import Timer from './Pages/Timer';
import Timer2 from './Pages/Timer2';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Pages/login';
import './App.css';

function handleLogout() {
  localStorage.removeItem('login');
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Login</Link>
            </li> */}
            <li>
              <Link to="/Timer">Timer</Link>
            </li>
            {/* <Link className='nav' onClick={handleLogout} to="/">
              Logout
            </Link> */}
          </ul>
        </nav>

        <Switch>
          <Route path="/Timer">
            <Timer2/>
          </Route>
          <Route path="/">
            <Timer2/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
