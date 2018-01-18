import React, { Component } from 'react';

import AddListingForm from '../../components/AddListingForm/AddListingForm';

import axios from 'axios';

class ClassName extends Component {
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

            <AddListingForm />
		);
    }

}

export default ClassName;
