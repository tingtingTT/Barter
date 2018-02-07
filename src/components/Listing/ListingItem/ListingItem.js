import React from 'react';

import classes from './ListingItem.css'
import Button from '../../UI/Button/Button';

const listingItem = (props) => (

    <div className={classes.Item} onClick={props.clicked}>
        <img src={props.img} className={classes.Image} alt=''/>
        <p>{props.category || "None"}</p>
        <p> 0 </p>
        <p> Bid </p>
        <div className={classes.Inside}>
            <h1>{props.category || "None"}</h1>
            <h1>{props.name}</h1>
            <h1>0 Bid</h1>
            <h2>Place Holder</h2>
            <h1>Edit</h1>
            <h2>Plcae Holder</h2>
            <Button label="Delete"></Button>
        </div>
    </div>

);

export default listingItem;
