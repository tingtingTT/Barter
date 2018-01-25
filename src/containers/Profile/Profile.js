import React, { Component } from 'react';

import AddListingForm from '../../components/AddListingForm/AddListingForm';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Inventory from '../../components/Inventory/Inventory'
import Item from '../../components/Inventory/Item/Item'
import classes from './Profile.css'

import axios from 'axios';


class Profile extends Component {
    state = {
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

    // componentDidMount () {
    //     axios.get('https://barter-sf.firebaseio.com/inventory.json')
    //         .then(response => {
    //             // console.log(response);
    //             this.setState({inventory: response.data});
    //         });
    // }

    addingItemHandler = () => {
        this.setState({addingItem: true});
    }

    addCancelHandler = () => {
        this.setState({addingItem: false});
        console.log("clicked");
    }

    componentDidMount = () =>{
        //alert(this.state.personal_inventory[1].title)
    }

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
                <div className={classes.Inventory}>
                    <Inventory inventory={this.state.inventory}></Inventory>
                </div>
            </div>
      
        );
    }

}

export default Profile;
