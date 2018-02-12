import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Inventory from '../../components/Inventory/Inventory';
import Listing from '../../components/Listing/Listing';

import {connect} from 'react-redux';
import classes from './Home.css'

import axios from 'axios';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import {database} from 'firebase';
import Banner from '../../components/Banner/Banner';
import FilterMenu from '../../components/FilterMenu/FilterMenu';

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

	render () {
		return (
            <Auxiliary>
                <div>
                    <Banner></Banner>
                </div>
                {/* <div>
                    <FilterMenu/>
                </div> */}
                <div>
                    <Listing listing={this.state.listing.reverse()} />
                </div>
            </Auxiliary>
        );
    }

}

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}


export default connect(mapStateToProps) (Home);
