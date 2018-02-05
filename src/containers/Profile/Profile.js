import React, { Component } from 'react';

import AddListing from '../../components/AddListing/AddListing';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Inventory from '../../components/Inventory/Inventory';
import Listing from '../../components/Listing/Listing';


import classes from './Profile.css'

import axios from 'axios';
import { Route } from 'react-router-dom';


class Profile extends Component {
    state = {
        inventory: [],
        listing: [],
        addingItem: false,
        itemAdded: false
    }

    componentDidMount () {
        axios.get('https://barterbuddy-4b41a.firebaseio.com/inventory.json')
            .then(response => {
                const fetchedItems = []
                for (let key in response.data) {
                    fetchedItems.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({inventory: fetchedItems});
                this.setState({listing: fetchedItems});
            });
    }




    addingItemHandler = () => {
        console.log('adding Item');
        this.setState({addingItem: true});
        this.props.history.replace( '/profile/addlisting' );
    }

    editItemHandler = (itemID) => {
        const items = {};
        for (let item in this.state.inventory) {
            items[this.state.inventory[item].id] = this.state.inventory[item];
        }

        console.log(itemID);
        console.log(items);
        console.log(items[itemID]);
    }


    closeHandler = () => {

        
        this.setState({addingItem: false});
        console.log("clicked");

        axios.get('https://barterbuddy-4b41a.firebaseio.com/inventory.json')
            .then(response => {
                const fetchedItems = []
                for (let key in response.data) {
                    fetchedItems.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({inventory: fetchedItems});
                this.setState({listing: fetchedItems});
                console.log(fetchedItems);
            });
        
        
    }



	render () {



		return (
          <Auxiliary>
              <Button label="+ ITEM" clicked={this.addingItemHandler}/>
              <Modal show={this.state.addingItem} modalClosed={() => this.closeHandler(true)}>
                 {/* <Route path={this.props.match.path + '/profile/addlisting'} component={ AddListing }/> */}
                 <AddListing closeModal={this.closeHandler} />

              </Modal>
              <div>
                  <Listing listing={this.state.listing.reverse()} />
              </div>
              <div>
                  <Inventory inventory={this.state.inventory.reverse()} editItemHandler={this.editItemHandler}/>
              </div>
          </Auxiliary>
		);
    }

}

export default Profile;
