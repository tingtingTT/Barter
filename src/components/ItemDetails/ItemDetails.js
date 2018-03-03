import React, { Component } from 'react';
import firebase from 'firebase';
import {database} from 'firebase';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './ItemDetails.css';
import WinningBidButton from './WinningBidButton/WinningBidButton';
import BidItems from './BidItems/BidItems';
import SelectBid from '../SelectBid/SelectBid';
import Modal from '../UI/Modal/Modal';

class ItemDetails extends Component {
    //TODO: Get item from DB using props.itemID
    state = {
        item: {},
        bidItems: [{owner: 'user1', zipcode: 95126, title: 'a used TV'},
        {owner: 'user2', zipcode: 95127, title: 'a used bike'},
        {owner: 'user3', zipcode: 95128, title: 'a used computer'},
        {owner: 'user4', zipcode: 95129, title: 'a used cloth'},
        {owner: 'user5', zipcode: 95120, title: 'a pair of used shoes'}],
        showModal: false



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

    componentWillMount () {
        console.log('item');
        const query = new URLSearchParams(this.props.location.search);
        const item = {};
        for (let param of query.entries()){

            item[param[0]] = param[1];
        }

        this.setState({item: item});


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
                        <SelectBid />
                    </Modal>
                    
                    
                    
                    <BidItems bidItems={this.state.bidItems} onClick={this.setWinner} itemOwner={'PennyMonster38'} toggleModal={this.toggleModal}></BidItems> {/*item.owner*/}

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
