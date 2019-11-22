import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './views/Login'
import AppNavigator from './views/AppNavigator'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={AppNavigator} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
