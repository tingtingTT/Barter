import React, { Component } from 'react';

import AddListing from '../../components/AddListing/AddListing';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import InventoryItem from '../../components/Inventory/InventoryItem/InventoryItem';

import classes from './Profile.css'

import axios from 'axios';
import { Route } from 'react-router-dom';
import * as firebase from 'firebase';
import {database} from 'firebase';



const config = {
    apiKey: "AIzaSyDfRWLuvzYmSV3TwmLOppZT0ZZbtIZRlrs",
    authDomain: "barterbuddy-4b41a.firebaseapp.com",
    databaseURL: "https://barterbuddy-4b41a.firebaseio.com",
    projectId: "barterbuddy-4b41a",
    storageBucket: "barterbuddy-4b41a.appspot.com",
    messagingSenderId: "879139739414"
};

//create
let itemDb = firebase.initializeApp(config, 'itemDb').database().ref('/itemDb');
let userInfo = firebase.initializeApp(config, 'userInfo').database().ref('userInfo');

itemDb.on('value', snapshot =>{
    const items = snapshot.val();
    console.log(items);
});

class Profile extends Component {
    state = {
        // inventory: [],
        addingItem: false,
        itemAdded: false,
        //dont want variable with same name as component
        inventory: [
                {
                    title: 'First Item',
                    description: 'The first dummy stub item',
                },
                {
                    title: 'Second Item',
                    description: 'The Second dummy stub item',
                },
                {
                    title: 'Third Item',
                    description: 'The Third dummy stub item',
                }
            ],
        addingItem: false

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
            });
    }




    addingItemHandler = () => {
        console.log('adding Item');
        this.setState({addingItem: true});
        this.props.history.replace( '/profile/addlisting' );
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
                console.log(fetchedItems);
            });
    }

	render () {
		return (
          <Auxiliary>
              <Button label="+ ITEM" clicked={this.addingItemHandler}/>
              <Modal show={this.state.addingItem} modalClosed={() => this.closeHandler(true)}>
                 {/* <Route path={this.props.match.path + '/profile/addlisting'} component={ AddListing }/> */}
                 <AddListing closeModal={this.closeHandler} addForm/>
              </Modal>
              <div>
                  {this.state.inventory.map(item => (
                      <InventoryItem key={item.id}
                          img={item.imageURL}
                          name={item.itemName}
                          desc={item.desc}
                      />
                  ))}
              </div>
          </Auxiliary>
		);
    }

}

export default Profile;
