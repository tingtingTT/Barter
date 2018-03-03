import React from 'react';
import BidItem from './BidItem/BidItem';
import classes from './BidItems.css';
import { withRouter } from 'react-router-dom';





const bidItems = (props) => {


    let bidItems = null
    var that = this;
    if(props.bidItems){
        bidItems = (
            props.bidItems.map((item, index) => (
                <BidItem key={index}
                    owner={item.owner}
                    title={item.title}
                    zipcode={item.zipcode}
                    itemOwner={props.itemOwner}
                    onClick={props.onClick}
                />
            ))
        );
    }
    return (
        <div className={classes.BidItems}>
            <div className={classes.content}>
                <div className={classes.name}>Current Bids</div>
                <div className={classes.bidbtn} onClick={props.toggleModal}>Add Bid(s)</div>
            </div>
            {bidItems}
        </div>

    )
}


export default withRouter(bidItems);
