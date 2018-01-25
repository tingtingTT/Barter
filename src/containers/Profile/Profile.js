import React, { Component } from 'react';

import AddListingForm from '../../components/AddListingForm/AddListingForm';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import classes from './Profile.css'

import axios from 'axios';


class Profile extends Component {
    state = {
        inventory: null,
        addingItem: false
    }

    // componentDidMount () {
    //     axios.get('https://barter-sf.firebaseio.com/inventory.json')
    //         .then(response => {
    //             // console.log(response);
    //             this.setState({inventory: response.data});
    //         });
    // }

    addingItemHandler = () => {
        this.setState({addingItem: true});
    }

    addCancelHandler = () => {
        this.setState({addingItem: false});
        console.log("clicked");
    }
	render () {
		return (
      <Auxiliary>
          <Button label="+ ITEM" clicked={this.addingItemHandler}/>
          <Modal show={this.state.addingItem} modalClosed={this.addCancelHandler}>
              <div className={classes.Profile}>
                  <AddListingForm />
              </div>
          </Modal>
          <div></div>
      </Auxiliary>
		);
    }

}

export default Profile;
