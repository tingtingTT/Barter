/* Auction item detail page. It contains item picture, description, seller info and
current bids for the item. User can plcae bis on this page using their inventory items
*/
import React, { Component } from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux';
import classes from './ItemDetails.css';
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
    state = {
        item: {},
        auctionOwner: 'none',
        bidItems: [],
        showModal: false,
        userInventory: [],
        currentUser: 'none',
        addedBids: [],
        isOwner: false,
        ownerPicture: ''
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
        userInfo.child(this.state.item.owner).on('value', snapshot => {
            let info = snapshot.val();
            this.setState({auctionOwner: info.username, ownerPicture: info.picture});

        });

        let name = this.state.currentUser;
        this.setState({isOwner: (name === this.state.item.owner)});

        // GET actual bids
        auctionDB.child(this.state.item.itemKey).child('/bids/').on('value', snapshot=>{
            // let bids = snapshot.val();
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
            // let inv = snapshot.val()
            let returnArr = [];
            snapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
            this.setState({userInventory: returnArr});
        });
    }

    setSelected = (itemKey) => {
        let bids = this.state.addedBids;
        let inventory = {};
        this.state.userInventory.map((item) => {
            inventory[item.itemKey] = item;
        });
        let selected = inventory[itemKey]
        bids.push(selected);
        this.setState({addedBids: bids})
    }

    updateBidCount = (keyToIncrement, owner) =>{
        auctionDB.child(this.state.item.itemKey).child('/bids/').once("value", snapshot =>{
            let snapshotArr = this.snapshotToArray(snapshot);
            let ownerList = [];
            let arrLen = snapshotArr.length;
            for(var i = 0; i < arrLen; ++i){
                if(!ownerList.includes(snapshotArr[i].owner)){
                    ownerList.push(snapshotArr[i].owner);
                }
            }
            //get the current bid count in the auctionDb item
            let bidcount = '';
            let ownerName = '';
            auctionDB.child(keyToIncrement).once('value', snapshot=>{
                let item = snapshot.val();
                bidcount = item.bidcount;
                bidcount = ownerList.length;
                ownerName = item.ownerUser;
            }).then(()=>{
                auctionDB.child(keyToIncrement).child('bidcount').set(bidcount);
                userItems
                    .child(ownerName)
                    .child('auction')
                    .child(keyToIncrement)
                    .child('bidcount').set(bidcount);
            });
        })
    };

    addBid = (auction) => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        let bidsToAdd = this.state.addedBids;
        let ownerUsername = '...';
        // let bidcount = 0;
        var bu = '';
        var biduser = '';
        var itemString = '';

        //grab all bids from addedBids and push them to
        for (let index in bidsToAdd){
            let item = bidsToAdd[index];
            var itemcopy = JSON.parse(JSON.stringify(bidsToAdd[index]));
            if(index === 0){
            itemString += itemcopy.itemName + ' ';
            } else if (index !== (bidsToAdd.length - 1)){
            itemString += ', ' + itemcopy.itemName;
            } else {
            itemString += ' ' + itemcopy.itemName;
            }

            userInfo.child(item.ownerUser+'/').on('value', snapshot => {
                // GET real username
                const info = snapshot.val();
                bu = JSON.parse(JSON.stringify(info));
                biduser = bu.username;
                ownerUsername = info.username;

                var bidnotification = {
                    user: biduser,
                    date: dateTime,
                    action1: 'Bid on ',
                    item1: auction.name,
                    item2: itemString
                };
                firebase.database().ref('/userItems/' + auction.owner+'/log/notifications/').push(bidnotification);

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
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        var winningBids = [];
        var that = this;
        var itemString = '';
        var bu = '';
        var biduser = '';

        auctionDB.child(auction.itemKey).child('/bids/').orderByChild('owner').on('value', function(snap){
            snap.forEach(function(childNodes){
                if(childNodes.val().owner === bidder){
                winningBids.push(childNodes.val());
                } else {

                // var lnotes = '[' + dateTime + ']: ' + 'The auction for: ' + auction.name + 'has ended! Unfortunately, you lost!' + '\n';
                var lObj = {
                    user: 'YOU',
                    date: dateTime,
                    action1: 'Lost',
                    item1: auction.name,
                    item2: ''
                };
                firebase.database().ref('userItems/').child(childNodes.val().userid+'/').child('log/').child('notifications/').push(lObj);
                }
            });

            // Get bidder's user ID
            bu = JSON.parse(JSON.stringify(winningBids[0]));
            biduser = bu.userid;

            // Remove bidder's items from their inventory
            for (var i = 0; i < winningBids.length; i++){
                userItems.child(biduser).child('/inventory/').child(winningBids[i].itemKey).remove();
            }
            itemString = winningBids[0].title;
            // Indicate multiple winning bids if their are more than one
            if (winningBids.length > 1){
                itemString = itemString + ' ...etc.'
            }
        });


        var em = '';
        var bidderemail = '';
        userInfo.child(biduser + '/').on('value', snapshot =>{
            const info = snapshot.val();
            em = JSON.parse(JSON.stringify(info));
            bidderemail = em.email;
        });

        var ema = '';
        var auctioneeremail = '';
        var au = '';
        var auctioneerusername = '';

        userInfo.child(auction.owner + '/').on('value', snapshot =>{
            const info = snapshot.val();
            ema = JSON.parse(JSON.stringify(info));
            auctioneeremail = ema.email;
            au = JSON.parse(JSON.stringify(info));
            auctioneerusername = au.username;
        });



        auctionDB.child(auction.itemKey).remove();
        userItems.child(auction.owner).child('/auction/').child(auction.itemKey).remove();

        //SET NOTIFICATION FOR AUCTION OWNER
        var oObjN = {
            user: 'YOU',
            date: dateTime,
            action1: 'TRADED',
            item1: auction.name,
            item2: itemString
        };
        var oContactS = 'contact ' + bidder + ' to set up an exchange.';

        var oObjC = {
            msg: 'You chose a winner!',
            contact: oContactS,
            item1: auction.name,
            item2: itemString,
            contactinfo: bidderemail
        };

        firebase.database().ref('userItems/').child(auction.owner+'/').child('log/').child('contacts/').push(oObjC);
        firebase.database().ref('userItems/').child(auction.owner+'/').child('log/').child('notifications/').push(oObjN);

        //SET NOTIFICATION FOR BIDDER
        var bObjN = {
            user: 'YOU',
            date: dateTime,
            action1: 'WON',
            item1: auction.name,
            item2: itemString
        };
        var bContactS = 'contact ' + auctioneerusername + ' to set up an exchange.';
        var bObjC = {
            msg: 'You WON!!',
            contact: bContactS,
            item1: auction.name,
            item2: itemString,
            contactinfo: auctioneeremail
        };
        firebase.database().ref('userItems/').child(biduser+'/').child('log/').child('contacts/').push(bObjC);
        firebase.database().ref('userItems/').child(biduser+'/').child('log/').child('notifications/').push(bObjN);
        //PUSH TO HOME OR NOTIFICATION PAGE
        that.props.history.push('/');
    }


    snapshotToArray(snapshot) {
        var returnArr = [];
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    };

    toggleModal = () => {
        let newState = (this.state.showModal ? false : true);
        this.setState({showModal: newState});
    }

    render() {
        let pic = null;
        if(this.state.ownerPicture === undefined){
            pic = 'https://i.imgur.com/A9uKXOG.png';
        }
        else{
            pic = this.state.ownerPicture;
        }
        const image = (
            {'background-image': 'url(' + pic + ')'}
        );

        return (

            <div className = {classes.ItemDetails}>
                <div className = {classes.row}>
                    <div className = {classes.col1of2}>
                        <h1 className={classes.title}>{this.state.item.name}</h1>
                        <img src={this.state.item.img} className={classes.image}/>
                        <div className={classes.ownerDetails}>
                            {/* this is a placeholder for now, it should be the userIcon */}
                            <div className={classes.userIcon} style={image}></div>
                            <p className = {classes.owner}>{this.state.auctionOwner}</p>
                            {/* <p className = {classes.owner}>[rating]</p> */}
                        </div>

                    </div>

                    <div className = {classes.col1of2}>
                        {/*pass in this.state.item.zipCode as props to the map*/}
                        <div className={classes.desBox}>
                            <div className = {classes.row}>
                                <h3>Item Description</h3>
                                <div className = {classes.description}>
                                    <p className = {classes.descText}>{this.state.item.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={classes.row2}>

                    <Modal show={this.state.showModal} modalClosed={this.toggleModal}>
                        <SelectBidChart bidItems={this.state.userInventory} addBid={() => this.addBid(this.state.item)} setSelected={this.setSelected}></SelectBidChart>
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
