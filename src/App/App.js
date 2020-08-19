import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import TchatLogin from './components/TchatLogin/TchatLogin';
import Tchat  from './components/Tchat/Tchat';
import store from './store/store'
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/tchat/:name'>
            <Tchat></Tchat>
          </Route>
          <Route exact path='/'>
            <TchatLogin></TchatLogin>
          </Route>
          <Route>Error 404</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
