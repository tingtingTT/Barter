import React, { Component } from 'react';

import AddListing from '../../components/AddListing/AddListing';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Inventory from '../../components/Inventory/Inventory';
import Listing from '../../components/Listing/Listing';
import UserProfile from '../../components/UserProfile/UserProfile';

import {connect} from 'react-redux';
import classes from './Profile.css';

import axios from 'axios';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import {database} from 'firebase';



/* 
TODO:
    1. Style Profile Layout
    2. Add User info section
    3. Add functionality to Auction Item tiles
*/

//create

const config = {

    apiKey: "AIzaSyDfRWLuvzYmSV3TwmLOppZT0ZZbtIZRlrs",
    authDomain: "barterbuddy-4b41a.firebaseapp.com",
    databaseURL: "https://barterbuddy-4b41a.firebaseio.com",
    projectId: "barterbuddy-4b41a",
    storageBucket: "barterbuddy-4b41a.appspot.com",
    messagingSenderId: "879139739414"

};

let fb = firebase.initializeApp(config, 'profile');
let userInfo = fb.database().ref('userInfo/');
let itemDb = fb.database().ref('itemDb/');
let userItems = fb.database().ref('userItems/');


//debug
//const currentUser = 'backEndDevWithWrench';
class Profile extends Component {

    state = {
        inventory: [],
        listing: [],
        currentUser: 'none',
        addingItem: false,
        editingItem: false,
        itemToEdit: {
            category: '',
            itemName: '',
            desc: '',
            id: '',
            imageURL: '',
            ItemType: ''
        }
    };


    componentDidMount () {
        // let userItems = firebase.database().ref('/userItems');
        console.log('setting uderId to', this.props.userId);
        this.setState({currentUser: this.props.userId});
        let name = this.props.userId;
        userItems.child(name+ '/').on('value', snapshot =>{
            const items = snapshot.val();
            //console.log('in promise .on userid is', name)
            console.log('items in compdidmount',items);
            if(items != null){
                this.setState({inventory: items});
                this.setState({listing: items});
            }
        });
    }




    addingItemHandler = () => {
        this.setState({addingItem: true});
        this.props.history.replace( '/profile/addlisting' );
    };

    editItemHandler = (itemID) => {

        console.log(itemID);
        // makes an items object of the form --> itemID: {name: '', desc: '' ...}
        const items = {};
        let itemToEdit = this.state.inventory[itemID];
        itemToEdit.id = itemID; //Really just an index location
        console.log(itemToEdit);

        const itemObj = {...items[itemID]};


        this.setState({itemToEdit: itemToEdit, editingItem: true});
       
    };

    deleteItem = (itemID) => {
        
    };


    closeHandler = () => {
        this.setState({addingItem: false, editingItem: false});
    };

	render () {
        
        
		return (
            <div className={classes.content}>
                <div className={classes.row}>
                    <div className={classes.col1of4}>
                        <UserProfile profilePic="https://i.imgur.com/Ig7JBId.jpg"
                            userName="PennyButt226"
                            email="getdamouse@gmail.com"
                            zipCode="94070"/>
                    </div>
                    <div className={classes.col3of4}>
                        <h1 className={classes.sectionTitle}>Auction items</h1>
                        <p className={classes.sectionDesc}>These items are available for other members to bid on.</p>
                        
                        <Modal show={this.state.addingItem || this.state.editingItem} modalClosed={() => this.closeHandler(true)}>
                            <AddListing closeModal={this.closeHandler} 
                                editingItem={this.state.editingItem} 
                                category={this.state.itemToEdit.category} 
                                itemName={this.state.itemToEdit.itemName} 
                                id={this.state.itemToEdit.id} 
                                desc={this.state.itemToEdit.desc} 
                                imgURL={this.state.itemToEdit.imageURL}
                                ItemType={this.state.itemToEdit.ItemType} />

                        </Modal>
                        <div>
                            
                            <Listing listing={this.state.listing.reverse()} />
                        </div>
                       
                    </div>
                    
                   
                   
                </div>
                <div className={classes.row}>
                    <h1 className={classes.sectionTitle}>Bid items</h1>
                    <p className={classes.sectionDesc}>Use these items to bid on other members auction items.</p>
                    <div className={classes.addItemButton}>
                        <Button label="+ ITEM" clicked={this.addingItemHandler}/>
                    </div>
                    <div className={classes.spacer}></div>
                    <Inventory inventory={this.state.inventory.reverse()} editItemHandler={this.editItemHandler}/>
                </div>
                
                
            </div>
        );
    }
        
}

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
};


export default connect(mapStateToProps) (Profile);
