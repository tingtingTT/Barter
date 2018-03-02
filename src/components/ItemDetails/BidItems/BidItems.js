import React from 'react';
import BidItem from './BidItem/BidItem';

import classes from './BidItems.css';

const bidItems = (props) => {

    let bidItems = null
    if(props.bidItems){
        bidItems = (
            props.bidItems.map((item, index) => (
                <BidItem key={index}
                    owner={item.owner}
                    title={item.title}
                    zipcode={item.zipcode}
                />
            ))
        );
    }
    return (
        <div className={classes.BidItems}>
            <div className={classes.content}>
                <div className={classes.name}>Current Bids</div>
                <div className={classes.bidbtn}>Add Bid(s)</div>
            </div>
            {bidItems}
        </div>
        
    )
}
    
    
export default bidItems;
