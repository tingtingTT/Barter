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
        editingItem: false,
        itemToEdit: {
            category: '',
            itemName: '',
            desc: '',
            id: '',
            imageURL: ''
        }
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
        this.setState({addingItem: true});
        this.props.history.replace( '/profile/addlisting' );
    }

    editItemHandler = (itemID) => {
        
        // makes an items oject of the form --> itemID: {name: '', desc: '' ...}
        const items = {};
        
        for (let item in this.state.inventory) {
                
            items[this.state.inventory[item].id] = this.state.inventory[item];
            
        }

        const itemObj = {...items[itemID]};
        

        this.setState({itemToEdit: itemObj, editingItem: true});
       
    }

    deleteItem = (itemID) => {
        
    }


    closeHandler = () => {

        
        this.setState({addingItem: false, editingItem: false});

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



	render () {


		return (
            <Auxiliary>
                <Button label="+ ITEM" clicked={this.addingItemHandler}/>
                <Modal show={this.state.addingItem || this.state.editingItem} modalClosed={() => this.closeHandler(true)}>

                    {/* <AddListing closeModal={this.closeHandler} editingItem={this.state.editingItem} item={this.state.itemToEdit}/> */}
                    <AddListing closeModal={this.closeHandler} 
                        editingItem={this.state.editingItem} 
                        category={this.state.itemToEdit.category} 
                        itemName={this.state.itemToEdit.itemName} 
                        id={this.state.itemToEdit.id} 
                        desc={this.state.itemToEdit.desc} 
                        imgURL={this.state.itemToEdit.imageURL} />

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
