import React, { Component } from 'react';
import logo from './logo.svg';


import Layout from './hoc/Layout/Layout';

import { Route, Switch } from 'react-router-dom';

import Profile from './containers/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                {/* <Route path='/' component = {} /> */}
                <Route path='/profile' component = { Profile } />
            </Switch>

        </Layout>

      </div>
    );
  }
}

export default App;
