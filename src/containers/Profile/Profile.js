import React, { Component } from 'react';

import AddListingForm from '../../components/AddListingForm/AddListingForm';
import Modal from '../../components/UI/Modal/Modal';

import classes from './Profile.css'

import axios from 'axios';


class Profile extends Component {
    state = {
        inventory: null
    }

    // componentDidMount () {
    //     axios.get('https://barter-sf.firebaseio.com/inventory.json')
    //         .then(response => {
    //             // console.log(response);
    //             this.setState({inventory: response.data});
    //         });
    // }
	render () {

		return (
      <Modal>
        <div className={classes.Profile}>
          <AddListingForm />
        </div>
      </Modal>
		);
    }

}

export default Profile;
