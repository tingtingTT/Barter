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

// ZIP CODE: this.state.item.zipCode

class ItemDetails extends Component {

    state = {
        item: {},
        auctionOwner: 'none',
        bidItems: [],
        showModal: false,
        userInventory: [],
        currentUser: 'none',
        addedBids: [],
        isOwner: false,



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

        console.log('auction Item User:');
        console.log(this.state.item.owner);

        userInfo.child(this.state.item.owner).on('value', snapshot => {
            let info = snapshot.val();
            this.setState({auctionOwner: info.username});

        });




        let name = this.state.currentUser;
        this.setState({isOwner: (name === this.state.item.owner)});
        console.log(this.state.isOwner);

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

    updateBidCount = (keyToIncrement, owner) =>{


        //get the current bid count in the auctionDb item
        let bidcount = '';
        let ownerName = '';
        auctionDB.child(keyToIncrement).once('value', snapshot=>{
            let item = snapshot.val();
            bidcount = item.bidcount;
            if(bidcount == null){
                bidcount = 1;
            }else{
                bidcount = bidcount + 1;
            }
            ownerName = item.ownerUser;


        }).then(()=>{
            console.log('incrementing bid count to:', bidcount);
            auctionDB.child(keyToIncrement).child('bidcount').set(bidcount);
            userItems
                .child(ownerName)
                .child('auction')
                .child(keyToIncrement)
                .child('bidcount').set(bidcount);
        });

        //check for null

        //increment the key in the owners auction pane

        //increment the key in the auctionDB pane

        //increment the count, or set to 1 if it is null

        //push the count to the correct locations



    };

    addBid = () => {

        let bidsToAdd = this.state.addedBids;
        let ownerUsername = '';
        let bidcount = 0;
        //grab all bids from addedBids and push them to
        for (let index in bidsToAdd){
            let item = bidsToAdd[index];
            console.log('Item being bid on:',this.state.item);
            userInfo.child(item.ownerUser+'/').on('value', snapshot => {
                // GET real username
                const info = snapshot.val();
                console.log('USERNAME...');
                console.log(info.username);
                ownerUsername = info.username;
                // ADD item to bids list

                auctionDB.child(this.state.item.itemKey).child('/bids/').child(item.itemKey).set({
                    itemKey: item.itemKey,
                    owner: ownerUsername,
                    userid: item.ownerUser,
                    title: item.itemName,
                    zipcode: item.location
                });
            });


        }
        this.updateBidCount(this.state.item.itemKey,'');
        this.toggleModal();
    }



    setWinner(bidder, bidderid, auction){
      console.log('winner!');
      var winningBids = [];
      var biduser = '';
       var that = this;
       var itemString = '';

      auctionDB.child(auction.itemKey).child('/bids/').orderByChild('owner').on('value', function(snap){
           snap.forEach(function(childNodes){
             if(childNodes.val().owner === bidder){
               winningBids.push(childNodes.val());
             } else {
               var lnotes = 'The auction for: ' + auction.name + 'has ended! Unfortunately, you lost!';
               firebase.database().ref('userItems/' + childNodes.val().userid + '/log/lBid/').push(lnotes);
             }
           });

        });

        for (var i = 0; i < winningBids.length; i++){
         userItems.child(bidderid).child('/inventory/').child(winningBids[i].itemKey).remove();
         itemString += winningBids[i].title;
         biduser = winningBids[i].ownerUser;
         if(i !== ((winningBids.length) - 1)){ //this part may not work?
           itemString += ", ";
         } else {
           itemString += " ";
         }

        }


        auctionDB.child(auction.itemKey).remove();
        userItems.child(auction.owner).child('/auction/').child(auction.itemKey).remove();

        that.props.history.push('/'); //PUSH TO HOME OR NOTIFICATION PAGE
        var auctionowner = auction.owner;
        var winnerbidder = bidderid;

        //SET NOTIFICATION FOR AUCTION OWNER
        var onotes = 'You auctioned off: ' + auction.name + ' for: ' + itemString + ' from: ' + bidder + ' \n';
        firebase.database().ref('userItems/' + auction.owner + '/log/aWin/' ).push(onotes);
        //SET NOTIFICATION FOR BIDDER
        var bnotes = 'You won: ' + auction.name + ' from: ' + bidder + ' in exchange for: ' + itemString + ' \n';
        firebase.database().ref('userItems/' + bidderid + '/log/bWin/' ).push(bnotes);


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
        //console.log('this.state.item');
        //console.log(this.state.item);

        return (

            <div className = {classes.ItemDetails}>
                <div className = {classes.row}>
                    <div className = {classes.col1of2}>

                        <h1 className={classes.title}>{this.state.item.name}</h1>
                        <img src={this.state.item.img} className={classes.image}/>
                        <div className={classes.ownerDetails}>
                            {/* this is a placeholder for now, it should be the userIcon */}
                            <div className={classes.userIcon}></div>
                            <p className = {classes.owner}>{this.state.auctionOwner}</p>
                            {/* <p className = {classes.owner}>[rating]</p> */}
                        </div>

                    </div>

                    <div className = {classes.col1of2}>
                        {/*pass in this.state.item.zipCode as props to the map*/}
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

                    <BidItems bidItems={this.state.bidItems} isOwner={this.state.isOwner} onClick={(bidder, bidderid) => this.setWinner(bidder, bidderid, this.state.item)} itemOwner={this.state.item.owner} toggleModal={this.toggleModal}></BidItems> {/*item.owner*/};

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
