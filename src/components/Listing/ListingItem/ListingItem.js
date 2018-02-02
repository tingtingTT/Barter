import React from 'react';

import classes from './ListingItem.css'
import Button from '../../UI/Button/Button';

const listingItem = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} />
        <p>{props.category || "None"}</p>
        <p> 0 </p>
        <p> Bid </p>
        <div className={classes.Inside}>
            <p>{props.category || "None"}</p>
            <p>{props.name}</p>
            <p> 0 Bid </p>
            <p> Edit </p>
            <Button label="Delete"></Button>
        </div>
    </div>

);

export default listingItem;
