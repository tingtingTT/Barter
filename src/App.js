import React, { Component } from 'react';
import logo from './logo.svg';


import Layout from './hoc/Layout/Layout';

import { Route, Switch } from 'react-router-dom';

import Profile from './containers/Profile/Profile';
import Login from './components/Login/Login';
import Banner from './components/Banner/Banner';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Banner/>
            <Switch>
                {/* <Route path='/' component = {} /> */}
                <Route path='/profile' component = { Profile } />
                <Route path='/login' component = {Login} />
            </Switch>
        </Layout>

      </div>
    );
  }
}

export default App;
