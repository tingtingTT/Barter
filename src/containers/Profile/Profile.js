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
                this.setState({listing: fetchedItems});
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
                this.setState({listing: fetchedItems});
                console.log(fetchedItems);
            });
    }

    // componentDidMount = () =>{
    //     //alert(this.state.personal_inventory[1].title)
    // }

	render () {



		return (
          <Auxiliary>
              <Button label="+ ITEM" clicked={this.addingItemHandler}/>
              <Modal show={this.state.addingItem} modalClosed={() => this.closeHandler(true)}>
                 {/* <Route path={this.props.match.path + '/profile/addlisting'} component={ AddListing }/> */}
                 <AddListing closeModal={this.closeHandler} addForm/>

              </Modal>
              <div>
                  <Listing listing={this.state.listing.reverse()} />
              </div>

              <div>
                  <Inventory inventory={this.state.inventory.reverse()} />
              </div>
          </Auxiliary>
		);
    }

}

export default Profile;
