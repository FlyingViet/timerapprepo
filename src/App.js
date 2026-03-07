import React from 'react';
import Timer2 from './Pages/Timer2';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/Timer">Timers</Link></li>
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
