/* User profile component. This page container user profiule, picture,
inventory and current auction item listing
*/
import React, { Component } from 'react';
import AddListing from '../../components/AddListing/AddListing';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Inventory from '../../components/Inventory/Inventory';
import Listing from '../../components/Listing/Listing';
import UserProfile from '../../components/UserProfile/UserProfile';
import {connect} from 'react-redux';
import classes from './Profile.css';
import firebase from 'firebase';

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

class Profile extends Component {

    state = {
        inventory: [],
        listing: [],
        currentUser: 'none',
        userName: '',
        userEmail: '',
        userZip: '',
        profilePic: '',
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
        this.setState({currentUser: this.props.userId});
        let name = this.props.userId;
    
        userItems.child(name+ '/').child('/auction').on('value', snapshot=>{
            const items = snapshot.val();
            let returnArr = [];
            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
            if(items != null){
                this.setState({listing: returnArr});
            }else{
                var emptyArray = [];
                this.setState({inventory: emptyArray});

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

            if(items != null){
                this.setState({inventory: returnArr});
            }else{
                var emptyArray = [];
                this.setState({inventory: emptyArray});
            }

        });
        userInfo.child(name+ '/').on('value', snapshot =>{
            const info = snapshot.val();
            this.setState({userName: info['username'], userEmail: info['email'], userZip: info['zipcode'], profilePic: info['picture']});
            this.forceUpdate()

        });
    }

    removeFromAllbuckets = (pushKey) =>{
        //delete from auction DB
        firebase.database().ref('/auctionDB/').child(pushKey).remove().then(() =>{
            this.forceUpdate();
        });

        userItems.child(this.props.userId).child('/auction/').child(pushKey).remove().then(() =>{
            this.forceUpdate();
        });;
        userItems.child(this.props.userId).child('/inventory/').child(pushKey).remove().then(() =>{
            this.forceUpdate();
        });

    };

    removeAuction =(itemID)=> {
        let key = this.state.listing[itemID].key;
        this.removeFromAllbuckets(key);
        window.setTimeout(()=>{
            window.location.reload(true);
        }, 200);
    };

    removeBid=(pushKey)=>{
        firebase.database().ref('/auctionDB/').child(pushKey.key).remove();
        userItems.child(this.props.userId).child('auction').child(pushKey.key).remove();
        userItems.child(this.props.userId).child('inventory').child(pushKey.key).remove();
        this.setState({editingItem: false});
        this.forceUpdate();
    };

    addingItemHandler = () => {
        this.setState({addingItem: true});
        this.props.history.replace( '/profile/addlisting' );
    };

    //made this while crying about how components didn't like the way I passed data between them
    getKeyById = (id) =>{
        return this.state.listing[id].key;
    };

    editItemHandler = (itemID, type) => {
        let itemToEdit = {};
        if(type === 'bidItem'){
            // Its in bidItems
            itemToEdit = this.state.listing[itemID];
            itemToEdit.id = itemID; //Really just an index location
            itemToEdit.key = this.getKeyById(itemID);
        }
        else{
            // its def in Auction
            itemToEdit = this.state.inventory[itemID];
            itemToEdit.id = itemID; //Really just an index location
            itemToEdit.pushKey = this.state.inventory[itemID];
        }

        this.setState({itemToEdit: itemToEdit, editingItem: true});
    };


    deleteItemHandler = (itemID) => {
        firebase.database().ref('inventory/' + itemID).remove();
    };

    closeHandler = () => {
        this.setState({addingItem: false, editingItem: false});
    };

	render () {

        let extraButton = null;
            if (this.state.listing.length > 0 && this.state.inventory.length === 0){
                extraButton = (
                    <div>
                        <div className={classes.addItemButton}>
                    <Button label="+ ITEM" clicked={this.addingItemHandler} />
                    </div>
                    <Modal show={this.state.addingItem || this.state.editingItem} modalClosed={() => this.closeHandler(true)}>
                
                    <AddListing closeModal={this.closeHandler}
                        editingItem={this.state.editingItem}
                        category={this.state.itemToEdit.category}
                        itemName={this.state.itemToEdit.itemName}
                        id={this.state.itemToEdit.id}
                        desc={this.state.itemToEdit.desc}
                        imgURL={this.state.itemToEdit.imageURL}
                        ItemType={this.state.itemToEdit.ItemType}
                        pushKey={this.state.itemToEdit.key}
                        onClick={() => this.removeBid(this.state.itemToEdit)}
                        zipCode={this.state.userZip}
                    />

                </Modal>
                    </div>
                
            );
        }

        let inventory = null;
        if(this.state.inventory.length > 0){
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
                <h1 className={classes.sectionTitle}>Add items!</h1>
                <Button label="+ ITEM" clicked={this.addingItemHandler} />
                <div className={classes.bigSpacer}></div>
                <Modal show={this.state.addingItem || this.state.editingItem} modalClosed={() => this.closeHandler(true)}>
                        <AddListing closeModal={this.closeHandler}
                            editingItem={this.state.editingItem}
                            category={this.state.itemToEdit.category}
                            itemName={this.state.itemToEdit.itemName}
                            id={this.state.itemToEdit.id}
                            desc={this.state.itemToEdit.desc}
                            imgURL={this.state.itemToEdit.imageURL}
                            ItemType={this.state.itemToEdit.ItemType}
                            pushKey={this.state.itemToEdit.key}
                            onClick={() => this.removeBid(this.state.itemToEdit)}
                            zipCode={this.state.userZip}
                        />

                    </Modal>
            </div>

        );
        if(this.state.listing.length > 0){
            auctions = (
                <div>
                    <h1 className={classes.sectionTitle}>Auction items</h1>
                    <p className={classes.sectionDesc}>These items are available for other members to bid on.</p>
                    {extraButton}
                    <Modal show={this.state.addingItem || this.state.editingItem} modalClosed={() => this.closeHandler(true)}>
                        <AddListing closeModal={this.closeHandler}
                            editingItem={this.state.editingItem}
                            category={this.state.itemToEdit.category}
                            itemName={this.state.itemToEdit.itemName}
                            id={this.state.itemToEdit.id}
                            desc={this.state.itemToEdit.desc}
                            imgURL={this.state.itemToEdit.imageURL}
                            ItemType={this.state.itemToEdit.ItemType}
                            onClick={() => this.removeBid(this.state.itemToEdit)}
                            pushKey={this.state.itemToEdit.key}
                            zipCode={this.state.userZip}
                        />

                    </Modal>
                    <div>

                        <Listing listing={this.state.listing} editListingItemHandler={this.editItemHandler} delclicked={this.removeAuction} type='auc'/>
                    </div>
                </div>
            );

        }

		return (
            <div className={classes.content}>
                <div className={classes.row}>
                    <div className={classes.col1of4}>

                        <UserProfile profilePic={this.state.profilePic}
                            userName={this.state.userName}
                            email={this.state.userEmail}
                            zipCode={this.state.userZip}
                            userId={this.props.userId}/>
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
