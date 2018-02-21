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
            <div className={classes.line}>{props.category || "None"}</div>
            <div className={classes.line}>{props.name}</div>
            <div className={classes.line}>0 Bid</div>
            <button>Edit</button>
            <Button label="Delete"></Button>
        </div>
    </div>

);

export default listingItem;
