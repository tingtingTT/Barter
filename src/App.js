import React, { Component } from 'react'

import Layout from './hoc/Layout/Layout';

import { Route, Switch, IndexRoute } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { faGamepad } from '@fortawesome/fontawesome-free-solid';

import Profile from './containers/Profile/Profile';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp/SignUp';
import Banner from './components/Banner/Banner';
import Home from './containers/Home/Home';

fontawesome.library.add(brands, faGamepad);
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path='/profile' component = {Profile} />
                <Route path='/details' component = {ItemDetails} />
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
