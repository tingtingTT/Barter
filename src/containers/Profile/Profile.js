import React, { Component } from 'react';

import AddListingForm from '../../components/AddListingForm/AddListingForm';

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
            <div className={classes.Profile}>
                <h1>Add a Listing</h1>
                <AddListingForm />
            </div>

		);
    }

}

export default Profile;
