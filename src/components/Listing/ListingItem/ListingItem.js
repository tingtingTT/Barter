import React from 'react';

import classes from './ListingItem.css'

const listingItem = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} />
        <p>{props.category || "None"}</p>
        <p> 0 </p>
        <p> Bid </p>
    </div>

);

export default listingItem;
