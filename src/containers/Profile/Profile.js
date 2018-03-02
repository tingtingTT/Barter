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
let userItems = fb.database().ref('userItems/');


//debug
//const currentUser = 'backEndDevWithWrench';
class Profile extends Component {

    state = {
        inventory: [],
        listing: [],
        currentUser: 'none',
        userName: '',
        userEmail: '',
        userZip: '',
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


        userItems.child(name+ '/').child('/auction').on('value', snapshot=>{
            const items = snapshot.val();
            //console.log('in promise .on userid is', name)
            console.log('items in compdidmount');
            console.log(items)
            let returnArr = [];
        
            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val(); 
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
            
            if(items != null){
                this.setState({listing: returnArr});
            }
        });
        userItems.child(name+ '/').child('/inventory').on('value', snapshot =>{
            const items = snapshot.val();
           
            let returnArr = [];
        
            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val(); 
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
            console.log('????????????????')
            console.log(returnArr)
        
            if(items != null){
                this.setState({inventory: returnArr});
            }
        });
        userInfo.child(name+ '/').on('value', snapshot =>{
            const info = snapshot.val()
            console.log('userInfo:');
            console.log(info);
            this.setState({userName: info['username'], userEmail: info['email'], userZip: info['zipcode']});
        });

    }

    




    addingItemHandler = () => {
        this.setState({addingItem: true});
        this.props.history.replace( '/profile/addlisting' );
    };

    editItemHandler = (itemID, type) => {

        const items = {};
        let itemToEdit = {}
        if(type === 'auc'){
            // Its in inventory
            
            // makes an items object of the form --> itemID: {name: '', desc: '' ...}
            itemToEdit = this.state.listing[itemID];
            itemToEdit.id = itemID; //Really just an index location
            
        }
        else{
            // its def in auction
            itemToEdit = this.state.inventory[itemID];
            itemToEdit.id = itemID; //Really just an index location
        }

        const itemObj = {...items[itemID]};
        this.setState({itemToEdit: itemToEdit, editingItem: true});
        
       
    };



    deleteItemHandler = (itemID) => {
        console.log(itemID);
        firebase.database().ref('inventory/' + itemID).remove();
    };

    closeHandler = () => {
        this.setState({addingItem: false, editingItem: false});
    };

	render () {

        console.log('inventory check')
        console.log(this.state.inventory)
        
        let inventory = null;
        if(this.state.inventory){
           
            inventory = (
                <div>
                    <h1 className={classes.sectionTitle}>Bid items</h1>
                    <p className={classes.sectionDesc}>Use these items to bid on other members auction items.</p>
                    <div className={classes.addItemButton}>
                        <Button label="+ ITEM" clicked={this.addingItemHandler} />
                    </div>
                    <div className={classes.spacer}></div>
                    <Inventory inventory={this.state.inventory} editItemHandler={this.editItemHandler} type='inv'/>

                </div>
                
            );
            
        }

        let auctions = (
            <div>
                <h1 className={classes.sectionTitle}>Add items to your profile!</h1>
                <Button label="+ ITEM" clicked={this.addingItemHandler} />
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
            </div>

        );
        if(this.state.listing.length > 0){
            auctions = (
                <div>
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
                        
                        <Listing listing={this.state.listing} editListingItemHandler={this.editItemHandler} type='auc'/>
                    </div>
                </div>
            );
            
        }
        
		return (
            <div className={classes.content}>
                <div className={classes.row}>
                    <div className={classes.col1of4}>
                        <UserProfile profilePic="https://i.imgur.com/Ig7JBId.jpg"
                            userName={this.state.userName}
                            email={this.state.userEmail}
                            zipCode={this.state.userZip}/>
                    </div>
                    <div className={classes.col3of4}>
                        
                        {auctions}
                    </div>
                    
                   
                   
                </div>
                <div className={classes.row}>
                    
                    {inventory}
                   
                </div>
                
                
            </div>
        );
    }
        
}


const mapDispatchToProps = dispatch =>{
    return {
        onLogout: () => dispatch({type: 'LOGOUT'}),
    }
};

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (Profile);
