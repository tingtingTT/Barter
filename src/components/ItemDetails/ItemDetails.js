import React, { Component } from 'react';
import firebase from 'firebase';
import {database} from 'firebase';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './ItemDetails.css';
import WinningBidButton from './WinningBidButton/WinningBidButton';
import BidItems from './BidItems/BidItems';
import SelectBidChart from '../SelectBid/SelectBidChart/SelectBidChart';
import Modal from '../UI/Modal/Modal';

const config = {

    apiKey: "AIzaSyDfRWLuvzYmSV3TwmLOppZT0ZZbtIZRlrs",
    authDomain: "barterbuddy-4b41a.firebaseapp.com",
    databaseURL: "https://barterbuddy-4b41a.firebaseio.com",
    projectId: "barterbuddy-4b41a",
    storageBucket: "barterbuddy-4b41a.appspot.com",
    messagingSenderId: "879139739414"

};

let fb = firebase.initializeApp(config, 'itemDetails');
let auctionDB = fb.database().ref('auctionDB/');
let userItems = fb.database().ref('userItems/');
let userInfo = fb.database().ref('userInfo/');



class ItemDetails extends Component {
    //TODO: Get item from DB using props.itemID
    state = {
        item: {},
        bidItems: [],
        showModal: false,
        userInventory: [],
        currentUser: 'none',
        addedBids: []



    }
    componentWillMount () {

        this.setState({currentUser: this.props.userId});
        
        
        const query = new URLSearchParams(this.props.location.search);
        const item = {};
        for (let param of query.entries()){

            item[param[0]] = param[1];
        }

        this.setState({item: item});


        
    }

    componentDidMount() {


        
        let name = this.state.currentUser;

        // GET actual bids
        auctionDB.child(this.state.item.itemKey).child('/bids/').on('value', snapshot=>{
            let bids = snapshot.val();

            let returnArr = [];
            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });

            this.setState({bidItems: returnArr});
        });

        // GET users inventory to pass to bid select component
        userItems.child(name+'/').child('/inventory').on('value', snapshot=>{
            let inv = snapshot.val()
            let returnArr = [];
            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
            console.log('??????????????????????????')
            console.log(returnArr);

            this.setState({userInventory: returnArr});
        });

    }

    setSelected = (itemKey) => {

        // TODO: check if item is already in addedBids. if it is, remove it, else add
        let bids = this.state.addedBids;

        let inventory = {};
        this.state.userInventory.map(item => {
            inventory[item.itemKey] = item;
        });
        let selected = inventory[itemKey]
        bids.push(selected);
        
        

        this.setState({addedBids: bids})
    }

    addBid = () => {

        let bidsToAdd = this.state.addedBids;
        let ownerUsername = '';

        for (let index in bidsToAdd){
            let item = bidsToAdd[index];
            userInfo.child(item.ownerUser+'/').on('value', snapshot => {
                // GET real username
                const info = snapshot.val();
                console.log('USERNAME');
                console.log(info.username);
                ownerUsername = info.username;  

                // ADD item to bids list
                auctionDB.child(this.state.item.itemKey).child('/bids/').child(item.itemKey).set({
                    itemKey: item.itemKey,
                    owner: ownerUsername,
                    title: item.itemName,
                    zipcode: item.location
                });
            });
  
         
        }

        this.toggleModal();
    }

    isOwner(owner){
      console.log("isowner");
      console.log(owner);
      console.log(this.props.userId);
      if ('PennyMonster38' === owner){ //this.props.userId = owner
        return true;
      }
      return false;
    }

    setWinner(){
      console.log('winner!');

      //make code later when other items implemented.
      //make Winner
      //remove items from invy
    }


    

    toggleModal = () => {
        let newState = (this.state.showModal ? false : true);
        this.setState({showModal: newState});
    }

    // //Dummy Item

    // Once this is implemented using Props, need to change everything that gets info from Items
    render() {
        const item = {
            title: 'DVD Collection',
            desc: 'This is my extensive DVD collection. I have a multitude of genres. They are very rare. wow.',
            img: 'https://i.ytimg.com/vi/0S-gteTLcko/maxresdefault.jpg',
            zipCode: 92004,
            owner: 'PennyMonster38'
        }
        console.log('this.state.item');
        console.log(this.state.item);
        

        //

        return (

            <div className = {classes.ItemDetails}>
                <div className = {classes.row}>
                    <div className = {classes.col1of2}>

                        <h1 className={classes.title}>{this.state.item.name}</h1>
                        <img src={this.state.item.img} className={classes.image}/>
                        <div className={classes.ownerDetails}>
                            {/* this is a placeholder for now, it should be the userIcon */}
                            <div className={classes.userIcon}></div>
                            <p className = {classes.owner}>{item.owner}</p>
                            {/* <p className = {classes.owner}>[rating]</p> */}
                        </div>

                    </div>

                    <div className = {classes.col1of2}>
                        {/*pass in item.zipCode as props to the map*/}
                        MAP
                    </div>

                </div>

                <div className = {classes.row}>
                    <h3>Item Description</h3>
                    <div className = {classes.description}>
                        <p className = {classes.descText}>{this.state.item.desc}</p>
                    </div>

                </div>

                <div className={classes.row2}>

                    <Modal show={this.state.showModal} modalClosed={this.toggleModal}>
                        <SelectBidChart bidItems={this.state.userInventory} addBid={this.addBid} setSelected={this.setSelected}></SelectBidChart>
                    </Modal>
                    
                    
                    
                    <BidItems bidItems={this.state.bidItems} onClick={this.setWinner} itemOwner={'PennyMonster38'} toggleModal={this.toggleModal}></BidItems> {/*item.owner*/}

                </div>

                <div className={classes.row3}>
                    
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

export default connect(mapStateToProps) (ItemDetails);
