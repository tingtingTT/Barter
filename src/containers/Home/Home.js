import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Inventory from '../../components/Inventory/Inventory';
import ListingHome from '../../components/ListingHome/ListingHome';

import {connect} from 'react-redux';
import classes from './Home.css'

import axios from 'axios';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import {database} from 'firebase';
import Banner from '../../components/Banner/Banner';
import FilterMenu from '../../components/FilterMenu/FilterMenu';



import ItemDetails from '../../components/ItemDetails/ItemDetails';

class Home extends Component {

    state = {
        inventory: [],
        listing: [],
        hotListings: [],
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
    }


    componentDidMount () {
        // let userItems = firebase.database().ref('/userItems');
        var maxListings = 12; //can be modified later.
        this.setState({currentUser: this.props.userId});
        var that = this;
        var fetchedItems = [];
        var hotItems = [];
        var itemType = 'auction'; //can be modified later

        firebase.database().ref('/auctionDB').orderByChild('ItemType').equalTo(itemType).limitToLast(maxListings).on('value', snapshot =>{
          snapshot.forEach(function(item){
            //only check for public items
            if (item.val().public === true){
                let itemToStore = item.val();
                itemToStore.itemKey = item.key;
                if(!itemToStore.bidcount){
                    itemToStore.bidcount = 0;
                }
              fetchedItems.push(itemToStore);
            }
          });

          //console.log(fetchedItems);
          if(fetchedItems !== null || fetchedItems !== []){
            that.setState({listing: fetchedItems});
          }

        });

        firebase.database().ref('/auctionDB').orderByChild('bidcount').limitToLast(5).on('value', snap=>{
            snap.forEach(function(item){
                //only check for public items
                if (item.val().public === true){
                    let itemToStore = item.val();
                    itemToStore.itemKey = item.key;
                    if(!itemToStore.bidcount){
                        itemToStore.bidcount = 0;
                    }
                    hotItems.push(itemToStore);
                }
            });
            console.log(hotItems);
            if(hotItems !== null || hotItems !== []){
                this.setState({hotListings: hotItems});
            }
        })
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

    filtZipcode = () => {
      var zc = document.getElementById('filterZip').value;
      //var count = 0;
      const maxListings = 12; // can be dynamic later
      var fetchedItems = [];
      var itemType = 'auction'; //can be modified later

        var that = this;
        firebase.database().ref("/auctionDB").orderByChild('location').equalTo(zc).limitToLast(maxListings).on("value", function(snapshot) {
          snapshot.forEach(function(item) {
            if(item.val().ItemType === 'auction' && item.val().public === true){
                let itemToStore = item.val();
                itemToStore.itemKey = item.key;
                if(!itemToStore.bidcount){
                    itemToStore.bidcount = 0;
                }
                fetchedItems.push(itemToStore);
            }
          });
            that.setState({listing: fetchedItems});
        });

        var that = this;
        if(zc === ""){ //if no filter, want to still show listings
          firebase.database().ref("/auctionDB").orderByChild('ItemType').equalTo(itemType).limitToLast(maxListings).on('value', function(snap){
             snap.forEach(function(item){
                 //only check for public items
                 if (item.val().public === true){
                     let itemToStore = item.val();
                     itemToStore.itemKey = item.key;
                     if(!itemToStore.bidcount){
                         itemToStore.bidcount = 0;
                     }
                     fetchedItems.push(itemToStore);
                 }
             });
             if(fetchedItems !== null || fetchedItems !== [] || fetchedItems !== undefined){
               that.setState({listing: fetchedItems});
             }
          });
        }
    }

    filtCategory = (category) => {
      //var count = 0;
      var maxListings = 12; // can be dynamic later
      var fetchedItems = [];
      var that = this;
      var itemType = 'auction'; //can be modified later
      if (category === 'Select a Category' && this.state.listings === undefined){
        firebase.database().ref("/auctionDB").orderByChild('ItemType').equalTo(itemType).limitToLast(maxListings).on('value', function(snap){
          snap.forEach(function(item){
            //only check for public items
            if (item.val().public === true){
                let itemToStore = item.val();
                itemToStore.itemKey = item.key;
                fetchedItems.push(itemToStore);
            }
          });
          that.setState({listing: fetchedItems});
        });
      }
      if(category !== 'Select a Category'){
        firebase.database().ref("/auctionDB").orderByChild('category').equalTo(category).limitToLast(maxListings).on("value", function(snapshot) {
          snapshot.forEach(function(item) {
              if(item.val().public === true && item.val().ItemType === 'auction'){
                  let itemToStore = item.val();
                  itemToStore.itemKey = item.key;
                  fetchedItems.push(itemToStore);
              }
          });
          that.setState({listing: fetchedItems});
        });
      }
    }


	render () {
		return (
            <div className={classes.Home}>
                <div>
                    <Banner></Banner>
                </div>
                { <div>
                    <FilterMenu onChange={this.filtCategory} onClick={this.filtZipcode}/>
                </div> }
                <div>
                    <h1>Hot Listings!</h1>
                    <ListingHome listing={this.state.hotListings}/>
                <hr/><hr/><hr/>
                </div>

                <div>
                    <ListingHome listing={this.state.listing.reverse()} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}


export default connect(mapStateToProps) (Home);
