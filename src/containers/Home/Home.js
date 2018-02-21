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
        this.setState({currentUser: this.props.userId});
        firebase.database().ref('/userItems').child(this.state.currentUser).on('value', snapshot =>{
            const items = snapshot.val();
            console.log(items);
            if(items != null){
                this.setState({inventory: items});
                this.setState({listing: items});
            }

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

    filtZipcode = () => {
      var zc = document.getElementById('filterZip').value;
      //var count = 0;
      const maxListings = 6; // can be dynamic later
      var fetchedItems = [];
          // old code - don't delete yet, in case.
          // firebase.database().ref("/itemDb").on('value', function(snap){
          //   snap.forEach(function(childNodes){
          //
          //     if(childNodes.val().location === zc && count < maxListings){
          //       count++;
          //       fetchedItems.push( childNodes.val());
          //     }
          //
          //     if(zc === "" && count < maxListings){ //if no filter, want to still show listings
          //       count++;
          //       fetchedItems.push(childNodes.val());
          //     }
          //   });
          // });
        firebase.database().ref("/itemDb").orderByChild('location').equalTo(zc).limitToLast(maxListings).on("value", function(snapshot) {
          snapshot.forEach(function(childNodes) {
            fetchedItems.push( childNodes.val());
          });
        });
        if(zc === ""){ //if no filter, want to still show listings
          firebase.database().ref("/itemDb").limitToLast(maxListings).on('value', function(snap){
             snap.forEach(function(childNodes){
               fetchedItems.push(childNodes.val());
             });
          });
        }
        if(fetchedItems !== null || fetchedItems !== []){
          this.setState({listing: fetchedItems});
        }
    }

    filtCategory = (category) => {
      //var count = 0;
      var maxListings = 6; // can be dynamic later
      var fetchedItems = [];

      if (category === 'Select a Category' && this.state.listings === []){
        firebase.database().ref("/itemDb").limitToLast(maxListings).on('value', function(snap){
          snap.forEach(function(childNodes){
              fetchedItems.push(childNodes.val());
          });
        });
      }
      if(category !== 'Select a Category'){
        firebase.database().ref("/itemDb").orderByChild('category').equalTo(category).limitToLast(maxListings).on("value", function(snapshot) {
          snapshot.forEach(function(childNodes) {
              fetchedItems.push( childNodes.val());
          });
        });
        this.setState({listing: fetchedItems});
      }

    }
      // if (category !== 'Select a Category'){
      //     console.log(this.state.listing);
      //     firebase.database().ref("/itemDb").on('value', function(snap){
      //       snap.forEach(function(childNodes){
      //         if(childNodes.val().category === category && count < maxListings){
      //           count++;
      //           fetchedItems.push( childNodes.val());
      //         }
      //
      //
      //       });
      //     });
      //     this.setState({listing: fetchedItems});
      //   }

      // if(obj !== 'Select a Category'){
      //   console.log(obj);
      //   firebase.database().ref("/itemDb").on('value', function(snap){
      //     snap.forEach(function(childNodes){
      //       //This loop iterates over children of user_id
      //       //childNodes.key is key of the children of userid such as (-L5LoRiCBmIwqNw0kP7c)
      //       //childNodes.val().name;
      //       //childNodes.val().time;
      //       //childNodes.val().rest_time;
      //       //childNodes.val().interval_time
      //       //console.log(childNodes);
      //       if(childNodes.val().category === obj){
      //         console.log(childNodes.val().itemName);
      //       }
      //     });
      //   });
      // }

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
