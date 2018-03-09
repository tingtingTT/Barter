import React, { Component } from 'react'

import Layout from './hoc/Layout/Layout';

import { Route, Switch, IndexRoute } from 'react-router-dom';
// Icon import
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { faGamepad, faEdit, faTrashAlt, faTv, faBriefcase, faWrench, faImages, faFemale, faFutbol, faGem,
         faHome, faBath, faMapMarker, faStar} from '@fortawesome/fontawesome-free-solid';
// electronics, game, service, appliance, craft, clothing, sporting good, jewery, home goods, furniture


import Profile from './containers/Profile/Profile';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp/SignUp';
import Banner from './components/Banner/Banner';
import Home from './containers/Home/Home';
import ProfileLogs from './components/UserProfile/ProfileLogs/ProfileLogs';

// Add icons to library
fontawesome.library.add(brands, faGamepad, faEdit, faTrashAlt, faTv, faBriefcase, faWrench, faImages, faFemale, faFutbol, faGem,
  faHome, faBath, faMapMarker, faStar);

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path='/profile' component = {Profile} />
                <Route path='/details' component = {ItemDetails} />
                <Route path='/login' component = {Login} />
                <Route path='/logs' component = {ProfileLogs} />
                <Route path='/join' component = {SignUp} />
                <Route path='/' component = {Home} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
