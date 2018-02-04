
import React, { Component } from 'react';
import AddListingForm from '../../components/AddListingForm/AddListingForm';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Inventory from '../../components/Inventory/Inventory'
import * as firebase from 'firebase';
import {database} from 'firebase';
import classes from './Profile.css'
import axios from 'axios';

const config = {
    apiKey: "AIzaSyDfRWLuvzYmSV3TwmLOppZT0ZZbtIZRlrs",
    authDomain: "barterbuddy-4b41a.firebaseapp.com",
    databaseURL: "https://barterbuddy-4b41a.firebaseio.com",
    projectId: "barterbuddy-4b41a",
    storageBucket: "barterbuddy-4b41a.appspot.com",
    messagingSenderId: "879139739414"
};

const fb = firebase
    .initializeApp(config)
    .database()
    .ref();



const userNameFromLogin = 'user1';
class Profile extends Component {
    state = {
        myUserName: userNameFromLogin,
        inventory: [],
        testInventory: [
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
    };

    componentDidMount(){
        fb.on('value', snapshot => {
            //this is how we populate individual values of the db into
            const items = snapshot.child('itemDb').val();
            //console.log(items);
            let newInventory =  [];
            for( let oneItem in items) {
                newInventory.push(items[oneItem]);
            }
            //console.log(newInventory);
            this.setState({inventory: newInventory});
            //console.log(this.state.inventory);

        })

    };

    addingItemHandler = () => {
        this.setState({addingItem: true});
    };

    addCancelHandler = () => {
        this.setState({addingItem: false});
        console.log("clicked");
    };

    // componentDidMount = () =>{
    //     //alert(this.state.personal_inventory[1].title)
    // }

    render () {
        return (
            <div>
                <Auxiliary>
                    <Button label="+ ITEM" clicked={this.addingItemHandler}/>
                    <Modal show={this.state.addingItem} modalClosed={this.addCancelHandler}>
                        <div className={classes.Profile}>
                            <AddListingForm />
                        </div>
                    </Modal>
                </Auxiliary>
                <div>
                    <h2 >Your Items</h2>

                </div>
                <div className={classes.Inventory}>
                    <Inventory inventory={this.state.inventory}></Inventory>
                </div>
            </div>

        );
    }

}

export default Profile;

