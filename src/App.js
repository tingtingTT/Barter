import React, { Component } from 'react'

import Layout from './hoc/Layout/Layout';

import { Route, Switch, IndexRoute } from 'react-router-dom';

import Profile from './containers/Profile/Profile';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp/SignUp';
import Banner from './components/Banner/Banner';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path='/profile' component = {Profile} />
                <Route path='/login' component = {Login} />
                <Route path='/join' component = {SignUp} />
                <Route path='/' component = {Home} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
